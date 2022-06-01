import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditorService} from "../../editor.service";
import {Chord} from "../../../interfaces/chord";
import {LyricsItem} from "../../../interfaces/lyrics-item";
import {Router} from "@angular/router";
import {CHORD_CHAIN, CHORDS, POSTFIX_CHAIN} from "../../mock-chords";
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
  chordsArray = CHORD_CHAIN;
  postfixList: string[] = POSTFIX_CHAIN;

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
    this.prepareBeforeAddChords();
  }

  selectLyrics() {
    this.parseChords();
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

  addItemControl() {
    (this.form.get('items') as FormArray).push(
      new FormGroup({
          name: new FormControl(null, Validators.required),
          lines: new FormArray([])
        }
      )
    )
  }

  addLineControl(index: number){
    ((this.form.get('items') as FormArray).controls[index].get('lines') as FormArray).push(
      new FormGroup({
          chords: new FormControl(null),
          text: new FormControl(null)
      })
    );

  }

  removeItemControl(index: number) {
    (this.form.get('items') as FormArray).controls.splice(index, 1);
  }

  removeLinesControl(item_index: number, lines_index: number) {
    (((this.form.get('items') as FormArray).controls[item_index] as FormGroup).get('lines') as FormArray).controls.splice(lines_index,1)
  }

  private prepareBeforeAddChords() {
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
            chords: new FormControl(),
            text: new FormControl(line ? line : ''),
          })
        );
      });
    })
  }


  private parseChords() {
    this.form.value.items.forEach((item: LyricsItem) => {
      item.lines.forEach((line) => {
        let chords: Chord[] = [];
        // @ts-ignore
        let lineChords = line.chords.toString().split(/\[|]/);
        lineChords = lineChords.filter(Boolean);
        console.log(lineChords);
        for (let i = 0; i < lineChords.length; i++) {
          let chord = {position: 0, postfix: "", spaces: 0};
          if (lineChords[i].includes(' ')) {
            chord.spaces = lineChords[i].length;
            i++;
          } else {
            chord.spaces = 0;
          }
          if (this.chordsArray.includes(lineChords[i])) {
            chord.position = this.chordsArray.indexOf(lineChords[i]);
            i++;
            if (this.postfixList.includes(lineChords[i])) {
              chord.postfix = lineChords[i];
            }
          }
          chords.push(chord);
        }
        line.chords = chords;
      });
    });
  }


}
