import {Component, OnDestroy, OnInit} from '@angular/core';
import {Lyrics} from "../../../interfaces/lyrics";
import {LyricsService} from "../../services/lyrics.service";
import {Subscription} from "rxjs";
import {ThemeService} from "../../services/settings/theme.service";
import {GENRES} from "../../mock-genres";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public lyricsList: Lyrics[] = [];
  lyricsListSub: Subscription | undefined ;
  theme: string = 'light';
  searchTerm: string = '';
  tagFilter: string[] = [];
  reverseDirection = false;
  private localStorageLyricsList = 'lyricsList';
  genreList = GENRES;

  constructor(private lyricsService: LyricsService,
              private themeService: ThemeService) {
    if(localStorage.getItem(this.localStorageLyricsList)){
      this.lyricsList = JSON.parse(<string>localStorage.getItem(this.localStorageLyricsList));
    }
  }

  ngOnInit(): void {
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

  sortByName(){
    this.lyricsList.sort(function (a, b) {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      return 0;
    })

    if (!this.reverseDirection) {
      this.lyricsList.reverse();
    }
    this.reverseDirection = !this.reverseDirection;
  }

  sortById(){
    this.lyricsList.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    });

    if (!this.reverseDirection) {
      this.lyricsList.reverse();
    }
    this.reverseDirection = !this.reverseDirection;
  }

}
