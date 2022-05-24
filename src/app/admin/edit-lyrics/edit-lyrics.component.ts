import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Lyrics} from "../../interfaces/lyrics";
import {LyricsService} from "../../shared/services/lyrics.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LyricsItem} from "../../interfaces/lyrics-item";
import {EditorService} from "../editor.service";
import {Chord} from "../../interfaces/chord";
import {LyricsLine} from "../../interfaces/lyrics-line";
import {CHORD_CHAIN, CHORDS} from "../mock-chords";

@Component({
  selector: 'app-edit-lyrics',
  templateUrl: './edit-lyrics.component.html',
  styleUrls: ['./../editor/editor.scss']
})
export class EditLyricsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  // @ts-ignore
  lyrics: Lyrics;
  genreList: string[];
  itemNameList: string[];
  chordsList: Chord[] = CHORDS;
  chordsArray = CHORD_CHAIN;

  constructor(private lyricsService: LyricsService,
              private router: ActivatedRoute,
              private editorService: EditorService,
              private route: Router) {
    this.genreList = editorService.genreList;
    this.itemNameList = editorService.itemNameList;
    this.router.params.subscribe(params => {
      this.lyrics = this.lyricsService.getLyricsById(params['id']);
    });
  }

  ngOnInit(): void {
    console.log(this.lyrics);
    this.form = new FormGroup({
      id: new FormControl(this.lyrics.id),
      name: new FormControl(this.lyrics.name),
      tonality: new FormControl(this.lyrics.tonality),
      comment: new FormControl(this.lyrics.comment),
      tags: new FormControl(this.lyrics.tags),
      items: new FormArray([])
    });
    this.prepare();
    console.log('form: ', this.form.value);
  }

  updateLyrics() {
    this.prepareBeforeCreate();
    this.lyricsService.updateLyrics(this.form.value).subscribe((res) => {
      console.log(res);
    });
    this.route.navigate(['/admin', 'dashboard']);
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

  getChords(item_index: number, line_index: number): any {
    // console.log(((((this.form.get('items') as FormArray).controls[item_index] as FormGroup)
    //   .get('lines') as FormArray).controls[line_index].get('chords') as FormArray).value);
    return ((((this.form.get('items') as FormArray).controls[item_index] as FormGroup)
      .get('lines') as FormArray).controls[line_index].get('chords') as FormArray).controls;
  }

  removeItemControl(index: number) {
  }

  removeLinesControl(index: number, index1: number) {
  }

  private prepare() {
    // @ts-ignore
    this.lyrics.items.forEach((item: LyricsItem, index: number) => {
      (this.form.get('items') as FormArray).push(
        new FormGroup({
          name: new FormControl(item.name),
          lines: new FormArray([])
        })
      );

      item.lines.forEach((line: LyricsLine, index_line: number) => {
        (((this.form.get('items') as FormArray).controls[index] as FormGroup).get('lines') as FormArray).push(
          new FormGroup({
            chords: new FormArray([]),
            text: new FormControl(line.text),
          })
        );
        line.text.split('').forEach((chord) => {
          (((((this.form.get('items') as FormArray).controls[index] as FormGroup)
            .get('lines') as FormArray).controls[index_line] as FormArray).get('chords') as FormArray).push(new FormControl());
        })

        let step = 0;
        line.chords.forEach( (chord, index_ch) =>{
          step+= chord.spaces;
          ((((this.form.get('items') as FormArray).controls[index] as FormGroup)
            .get('lines') as FormArray).controls[index_line].get('chords') as FormArray).controls[step - 1]
            .setValue({position: chord?.position, postfix: chord?.postfix});
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
            console.log(space);
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
