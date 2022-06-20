import {Component, OnDestroy, OnInit} from "@angular/core";
import {Lyrics} from "../../../interfaces/lyrics";
import {LyricsService} from "../../../shared/services/lyrics.service";
import {Subscription} from "rxjs";
import {GENRES} from "../../../shared/mock-genres";
import {NotificationService} from "../../../shared/services/notification.service";

@Component({
  selector: 'app-lyrics-panel',
  templateUrl: 'lyrics-panel.component.html',
  styleUrls: ['lyrics-panel.component.scss', './../dashboard.component.scss']
})
export class LyricsPanelComponent implements OnInit, OnDestroy{
  public lyricsList: Lyrics[] = [];
  private lyricsListSub: Subscription | undefined ;
  private deleteLyricsSub: Subscription | undefined;
  public searchTerm: string = '';
  public tagFilter: string[] = [];
  public genreList = GENRES;

  constructor(private lyricsService: LyricsService,
              private notification: NotificationService){}

  ngOnInit(): void {
    this.lyricsListSub = this.lyricsService.getAllLyricsList().subscribe( lyrics => {
      this.lyricsList = lyrics;
    });
  }

  ngOnDestroy(): void {
  }

  setSearch(search: string | any): void{
    this.searchTerm = search;
  }

  setTagsFilter(tags: string | any): void{
    this.tagFilter = tags;
  }

  public refreshLyricsList(){
    this.lyricsService.refreshLyricsList();
  }

  public removeLyrics(id: string | any, name: string) {
    if(confirm("Are you sure to delete " + name)){
      this.deleteLyricsSub = this.lyricsService.removeLyrics(id).subscribe( () => {
        this.lyricsList = this.lyricsList.filter(list => list.id !== id);
        this.notification.showSuccess('lyrics has been deleted', 'Deleted')
        this.refreshLyricsList();
      })
    }
  }
}
