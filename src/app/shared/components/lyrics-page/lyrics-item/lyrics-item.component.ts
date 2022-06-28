import {Component, Input, OnInit} from "@angular/core";
import {LyricsItem} from "../../../../interfaces/lyrics-item";
import {ThemeService} from "../../../services/settings/theme.service";
import {Chord} from "../../../../interfaces/chord";
import {CHORD_CHAIN} from "../../../../admin/mock-chords";
import {FontService} from "../../../services/settings/font.service";

@Component({
  selector: 'lyrics-item',
  templateUrl: 'lyrics-item.component.html',
  styleUrls: ['lyrics-item.component.scss', './../lyrics-page.component.scss']
})

export class LyricsItemComponent implements OnInit{
  @Input() public item: LyricsItem | undefined;
  @Input() public showChords = false;
  @Input() public cordPosition = 0;
  public theme: string = 'light';
  private chordsArray = CHORD_CHAIN;
  public fontSize: number | undefined;
  private fontSizeChord: number | undefined;
  public font: string | undefined;

  constructor(private themeService: ThemeService,
              private fontService: FontService) {
  }

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe( theme => this.theme = theme);
    this.fontService.getCurrentLyricFont().subscribe((font) => {
      this.font = font;
    });
    this.fontService.getCurrentFontSize().subscribe(size => {
      this.fontSize = size;
      this.fontSizeChord = this.fontSize - 1;
    });
  }

  public convertLine(chords: Chord[]) {
    const line = chords.reduce((acc, chord) => {
      const length = this.chordsArray.length;
      const pos = ((chord.position + this.cordPosition) % length + length) % length;
      return `${acc}${' '.repeat(chord.spaces)}${this.chordsArray[pos]}${chord.postfix || ''} `
    }, "");
    return line;
  }

}
