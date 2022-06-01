import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Lyrics} from "../../interfaces/lyrics";
import {LyricsService} from "../../shared/services/lyrics.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LyricsItem} from "../../interfaces/lyrics-item";
import {EditorService} from "../editor.service";
import {Chord} from "../../interfaces/chord";
import {LyricsLine} from "../../interfaces/lyrics-line";
import {CHORD_CHAIN, CHORDS, POSTFIX_CHAIN} from "../mock-chords";

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
  chordsArray = CHORD_CHAIN;
  postfixList: string[] = POSTFIX_CHAIN;

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
    this.form = new FormGroup({
      id: new FormControl(this.lyrics.id),
      name: new FormControl(this.lyrics.name),
      tonality: new FormControl(this.lyrics.tonality),
      comment: new FormControl(this.lyrics.comment),
      tags: new FormControl(this.lyrics.tags),
      items: new FormArray([])
    });
    this.prepare();
  }

  updateLyrics() {
    this.parseChords();
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

  private prepare() {
    // @ts-ignore
    this.lyrics.items.forEach((item: LyricsItem, index: number) => {
      (this.form.get('items') as FormArray).push(
        new FormGroup({
          name: new FormControl(item.name),
          lines: new FormArray([])
        })
      );
      item.lines.forEach((line: LyricsLine) => {
        let chordLine: string = ' ';
        for( let i = 0; i < line.chords.length; i++){
          chordLine = chordLine + (" ").repeat(line.chords[i].spaces);
          chordLine = chordLine.concat("[");
          chordLine = chordLine.concat(this.chordsArray[line.chords[i].position]);
          chordLine =chordLine.concat("]");
          if(line.chords[i].postfix){
            chordLine = chordLine.concat("[");
            // @ts-ignore
            chordLine = chordLine.concat(line.chords[i]?.postfix);
            chordLine = chordLine.concat("]");
          }
        }
        (((this.form.get('items') as FormArray).controls[index] as FormGroup).get('lines') as FormArray).push(
          new FormGroup({
            chords: new FormControl(chordLine),
            text: new FormControl(line.text),
          })
        );
      });
    })
  }

  parseChords() {
    this.form.value.items.forEach((item: LyricsItem) => {
      item.lines.forEach((line) => {
        let chords: Chord[] = [];
        // @ts-ignore
        let lineChords = line.chords.toString().split(/\[|]/);
        lineChords = lineChords.filter(Boolean);
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
