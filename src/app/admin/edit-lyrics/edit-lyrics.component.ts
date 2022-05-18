import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Lyrics} from "../../interfaces/lyrics";
import {LyricsService} from "../../shared/services/lyrics.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {LyricsItem} from "../../interfaces/lyrics-item";
import {EditorService} from "../editor.service";
import {Chord} from "../../interfaces/chord";
import {LyricsLine} from "../../interfaces/lyrics-line";

@Component({
  selector: 'app-edit-lyrics',
  templateUrl: './edit-lyrics.component.html',
  styleUrls: ['./edit-lyrics.component.scss']
})
export class EditLyricsComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  // @ts-ignore
  lyrics: Lyrics;
  genreList: string[];
  itemNameList: string[];
  chordsList: Chord[] = [
    {position: 0, spaces: 0},
    {position: 0, spaces: 0, postfix: 'm'},
    {position: 1, spaces: 0},
    {position: 1, spaces: 0, postfix: 'm'},
    {position: 2, spaces: 0},
    {position: 2, spaces: 0, postfix: 'm'},
    {position: 3, spaces: 0},
    {position: 3, spaces: 0, postfix: 'm'},
    {position: 4, spaces: 0},
    {position: 4, spaces: 0, postfix: 'm'},
    {position: 5, spaces: 0},
    {position: 5, spaces: 0, postfix: 'm'},
    {position: 6, spaces: 0,},
    {position: 6, spaces: 0, postfix: 'm'},
    {position: 7, spaces: 0},
    {position: 7, spaces: 0, postfix: 'm'},
    {position: 8, spaces: 0},
    {position: 8, spaces: 0, postfix: 'm'},
    {position: 9, spaces: 0},
    {position: 9, spaces: 0, postfix: 'm'},
    {position: 10, spaces: 0},
    {position: 10, spaces: 0, postfix: 'm'},
    {position: 11, spaces: 0},
    {position: 11, spaces: 0, postfix: 'm'},
  ];
  chordsArray = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "Bb", "H"];

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

  }

  updateLyrics() {
    this.lyricsService.updateLyrics(this.form.value).subscribe( (res) => {
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
        line.chords.forEach(( chord) =>{
          // (((((this.form.get('items') as FormArray).controls[index] as FormGroup)
          //   .get('lines') as FormArray).controls[index_line] as FormArray).get('chords') as FormArray).push(new FormControl());
          //console.log(chord);
        })
      });
    })
  }

}
