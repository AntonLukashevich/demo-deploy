import {Component, OnDestroy, OnInit} from '@angular/core';
import {Lyrics} from "../../../interfaces/lyrics";
import {ActivatedRoute} from "@angular/router";
import {LyricsService} from "../../services/lyrics.service";
import {Observable, Subscription} from "rxjs";
import {Chord} from "../../../interfaces/chord";
import {FontService} from "../../services/settings/font.service";
import {ThemeService} from "../../services/settings/theme.service";

@Component({
  selector: 'app-lyrics-page',
  templateUrl: './lyrics-page.component.html',
  styleUrls: ['./lyrics-page.component.scss']
})
export class LyricsPageComponent implements OnInit, OnDestroy  {
  cordPosition = 0;
  showChords = false;
  lyricId: any;
  chordsArray = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "Bb", "H"];
  fontSize: number | undefined;
  // @ts-ignore
  lyric: Lyrics;
  font: string | undefined;
  theme: string | undefined;

  lyricsSub: Subscription | undefined;
  constructor(private root: ActivatedRoute,
              private lyricsService: LyricsService,
              private fontService: FontService,
              private themeService: ThemeService) {
    this.root.params.subscribe(params => this.lyricId = params['id']);
  }

  ngOnInit(): void {
    this.fontService.getCurrentLyricFont().subscribe((font) => {
      this.font = font;
    });
    this.fontService.getCurrentFontSize().subscribe(size => this.fontSize = size);
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

}
