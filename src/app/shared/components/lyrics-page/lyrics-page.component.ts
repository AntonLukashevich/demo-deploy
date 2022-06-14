import {Component, OnDestroy, OnInit} from '@angular/core';
import {Lyrics} from "../../../interfaces/lyrics";
import {ActivatedRoute, Router} from "@angular/router";
import {LyricsService} from "../../services/lyrics.service";
import {Subscription} from "rxjs";
import {Chord} from "../../../interfaces/chord";
import {FontService} from "../../services/settings/font.service";
import {ThemeService} from "../../services/settings/theme.service";
import {LyricInfoComponent} from "../lyrics-info/lyric-info.component";
import {MatDialog} from "@angular/material/dialog";
import {CHORD_CHAIN} from "../../../admin/mock-chords";

@Component({
  selector: 'app-lyrics-page',
  templateUrl: './lyrics-page.component.html',
  styleUrls: ['./lyrics-page.component.scss']
})
export class LyricsPageComponent implements OnInit, OnDestroy  {
  cordPosition = 0;
  showChords = false;
  lyricId: any;
  chordsArray = CHORD_CHAIN;
  fontSize: number | undefined;
  fontSizeChord: number | undefined;
  // @ts-ignore
  lyric: Lyrics;
  font: string | undefined;
  theme: string = 'light';

  lyricsSub: Subscription | undefined;
  constructor(private root: ActivatedRoute,
              private lyricsService: LyricsService,
              private fontService: FontService,
              private themeService: ThemeService,
              public dialog: MatDialog,
              private router: Router) {}

  ngOnInit(): void {
    this.root.params.subscribe(params => this.lyricId = params['id']);
    this.fontService.getCurrentLyricFont().subscribe((font) => {
      this.font = font;
    });
    this.fontService.getCurrentFontSize().subscribe(size => {
      this.fontSize = size;
      this.fontSizeChord = this.fontSize - 1;
    });
    this.lyric = this.lyricsService.getLyricsById(this.lyricId);
    this.themeService.getCurrentTheme().subscribe( theme => this.theme = theme);
  }

  toggle() {
    this.showChords = !this.showChords;
  }

  ngOnDestroy(): void {
    if(this.lyricsSub){
      this.lyricsSub.unsubscribe();
    }
  }

  increaseTon() {
    this.cordPosition++;
  }

  decreaseTon() {
    this.cordPosition--;
  }

  convertLine(chords: Chord[]) {
    const line = chords.reduce((acc, chord) => {
      const length = this.chordsArray.length;
      const pos = ((chord.position + this.cordPosition) % length + length) % length;
      return `${acc}${' '.repeat(chord.spaces)}${this.chordsArray[pos]}${chord.postfix || ''} `
    }, "");
    return line;
  }

  openDialog() {
    this.dialog.open(LyricInfoComponent, { data: {comment: this.lyric.comment}});
  }

  nextLyrics(currentLyricsId: number){
    const nextId = this.lyricsService.nextLyricsId(currentLyricsId);
    this.redirectTo('lyrics/' + nextId);
  }

  previousLyrics(currentLyricsId: number){
    const previousId = this.lyricsService.previousLyricsId(currentLyricsId);
    this.redirectTo('lyrics/' + previousId);
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }
}


