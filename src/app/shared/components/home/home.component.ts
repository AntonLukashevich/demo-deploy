import {Component, OnDestroy, OnInit} from '@angular/core';
import {Lyrics} from "../../../interfaces/lyrics";
import {LyricsService} from "../../services/lyrics.service";
import {Subscription} from "rxjs";
import {ThemeService} from "../../services/settings/theme.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // @ts-ignore
  public lyricsList: Lyrics[] = [];
  lyricsListSub: Subscription | undefined ;
  theme: string = 'light';
  searchTerm: string = '';
  private localStorageLyricsList = 'lyricsList';
  constructor(private lyricsService: LyricsService,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    if(localStorage.getItem(this.localStorageLyricsList)){
      this.lyricsList = JSON.parse(<string>localStorage.getItem(this.localStorageLyricsList));
    }
    this.lyricsListSub = this.lyricsService.getAllLyricsList().subscribe( lyrics => {
      this.lyricsList = lyrics;
    });
    this.themeService.getCurrentTheme().subscribe((theme) => {
      this.theme = theme;
    });
  }

  ngOnDestroy(): void {
    if(this.lyricsListSub){
      this.lyricsListSub.unsubscribe();
    }
  }
}
