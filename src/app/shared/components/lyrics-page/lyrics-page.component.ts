import {Component, OnDestroy, OnInit} from '@angular/core';
import {Lyrics} from "../../../interfaces/lyrics";
import {ActivatedRoute, Router} from "@angular/router";
import {LyricsService} from "../../services/lyrics.service";
import {Subscription} from "rxjs";
import {ThemeService} from "../../services/settings/theme.service";
import {LyricInfoComponent} from "../lyrics-info/lyric-info.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-lyrics-page',
  templateUrl: './lyrics-page.component.html',
  styleUrls: ['./lyrics-page.component.scss']
})
export class LyricsPageComponent implements OnInit, OnDestroy  {
  public cordPosition = 0;
  public showChords = false;
  private lyricId: any;
  // @ts-ignore
  public lyric: Lyrics;
  public theme: string = 'light';
  private lyricsSub: Subscription | undefined;

  constructor(private root: ActivatedRoute,
              private lyricsService: LyricsService,
              private themeService: ThemeService,
              public dialog: MatDialog,
              private router: Router) {}

  public ngOnInit(): void {
    this.root.params.subscribe(params => this.lyricId = params['id']);
    this.lyric = this.lyricsService.getLyricsById(this.lyricId);
    this.themeService.getCurrentTheme().subscribe( theme => this.theme = theme);
  }

  public toggle() {
    this.showChords = !this.showChords;
  }

  public ngOnDestroy(): void {
    if(this.lyricsSub){
      this.lyricsSub.unsubscribe();
    }
  }

  public increaseTon() {
    this.cordPosition++;
  }

  public decreaseTon() {
    this.cordPosition--;
  }

  public openDialog() {
    this.dialog.open(LyricInfoComponent, { data: {comment: this.lyric.comment}});
  }

  public nextLyrics(currentLyricsId: number){
    const nextId = this.lyricsService.nextLyricsId(currentLyricsId);
    this.redirectTo('lyrics/' + nextId);
  }

  public previousLyrics(currentLyricsId: number){
    const previousId = this.lyricsService.previousLyricsId(currentLyricsId);
    this.redirectTo('lyrics/' + previousId);
  }

  private redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate([uri]));
  }
}


