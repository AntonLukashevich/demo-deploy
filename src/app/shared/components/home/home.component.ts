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
  private lyricsListSub: Subscription | undefined ;
  public theme: string = 'light';
  public searchTerm: string = '';
  public tagFilter: string[] = [];
  private localStorageLyricsList = 'lyricsList';
  public genreList = GENRES;

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

  public setSearch(search: string | any): void{
    this.searchTerm = search;
  }

  public setTagsFilter(tags: string | any): void{
    this.tagFilter = tags;
  }
}
