import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {EditorService} from "../../editor.service";
import {Chord} from "../../../interfaces/chord";
import {LyricsItem} from "../../../interfaces/lyrics-item";
import {Router} from "@angular/router";
import {CHORD_CHAIN, CHORDS} from "../../mock-chords";
import {LyricsService} from "../../../shared/services/lyrics.service";
import {NotificationService} from "../../../shared/services/notification.service";

@Component({
  selector: 'app-create-lyrics-chords',
  templateUrl: './create-lyrics-chords.component.html',
  styleUrls: ['./../editor.scss']
})
export class CreateLyricsChordsComponent implements OnInit {
  lyricsText: any;
  genreList: string[];
  itemNameList: string[];
  form: FormGroup = new FormGroup({});
  chordsList: Chord[] = CHORDS;
  chordsArray = CHORD_CHAIN;

  constructor(private editorService: EditorService,
              private router: Router,
              private lyricsService: LyricsService,
              private notification: NotificationService) {
    this.genreList = editorService.genreList;
    this.itemNameList = editorService.itemNameList;
  }

  ngOnInit(): void {
    this.editorService.getLyricsText().subscribe((text) => {
      this.lyricsText = text;
    });
    this.form = new FormGroup({
      name: new FormControl(this.lyricsText.name),
      tonality: new FormControl(this.lyricsText.tonality),
      comment: new FormControl(this.lyricsText.comment),
      tags: new FormControl(this.lyricsText.tags),
      items: new FormArray([])
    });
    this.prepare();
  }

  selectLyrics() {
    this.prepareBeforeCreate();
    this.editorService.createLyrics(this.form.value).subscribe( (res) => {
      console.log(res);
      this.form.reset();
      this.notification.showSuccess('Lyrics has been added', 'Added')
      this.lyricsService.refreshLyricsList();
    })
    this.router.navigate(['/admin', 'dashboard']);
  }

  getItems(): any {
    return (this.form.get('items') as FormArray).controls;
  }

  getLines(index: number): any {
    return (((this.form.get('items') as FormArray).controls[index] as FormGroup).get('lines') as FormArray).controls;
  }

  getLine(item_index: number, line_index: number): any {
    return (((this.form.get('items') as FormArray).controls[item_index] as FormGroup).get('lines') as FormArray).controls[line_index];
  }

  removeItemControl(index: number) {}

  removeLinesControl(index: number, index1: number) {}

  private prepare() {
    this.lyricsText.items.forEach((item: LyricsItem, index: number) => {
      (this.form.get('items') as FormArray).push(
        new FormGroup({
          name: new FormControl(item.name),
          lines: new FormArray([])
        })
      );
      // @ts-ignore
      let lines = item?.iText.split('\n');
      lines.forEach((line: string, index_line: number) => {
        (((this.form.get('items') as FormArray).controls[index] as FormGroup).get('lines') as FormArray).push(
          new FormGroup({
            chords: new FormArray([]),
            text: new FormControl(line ? line : ''),
          })
        );
        line.split('').forEach(() =>{
          (((((this.form.get('items') as FormArray).controls[index] as FormGroup)
            .get('lines') as FormArray).controls[index_line] as FormArray).get('chords') as FormArray).push(new FormControl())
        })
      });
    })
  }
  private prepareBeforeCreate(){
    this.form.value.items.forEach((item: LyricsItem) =>{
      item.lines.forEach((line) => {
        let space = 0;
        line.chords.forEach((chord, index) =>{
          if (!chord) {
            space++;
          } else {
            chord.spaces = space;
            space = 0;
          }
        });
      });

      if (item.iText){
        // @ts-ignore
        item.iText = null;
      }
    })
  }
}
