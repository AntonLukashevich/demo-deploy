import {Component, OnInit} from "@angular/core";
import {ThemeService} from "../../../services/settings/theme.service";
import {LyricInfoComponent} from "../../lyrics-info/lyric-info.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'lyrics-tools',
  templateUrl: 'lyrics-tools.component.html',
  styleUrls: ['lyrics-tools.component.scss']
})

export class LyricsToolsComponent implements OnInit{
  public theme: string = 'light';
  showChords = false;

  constructor(private themeService: ThemeService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe( theme => this.theme = theme);
  }

  public openDialog() {
    let string = 'this.lyric.comment';
    this.dialog.open(LyricInfoComponent, { data: {comment: string}});
  }

  public toggle() {
    this.showChords = !this.showChords;
  }

  public nextLyrics(currentLyricsId: number){
    // const nextId = this.lyricsService.nextLyricsId(currentLyricsId);
    // this.redirectTo('lyrics/' + nextId);
  }

  public previousLyrics(currentLyricsId: number){
    // const previousId = this.lyricsService.previousLyricsId(currentLyricsId);
    // this.redirectTo('lyrics/' + previousId);
  }
}
