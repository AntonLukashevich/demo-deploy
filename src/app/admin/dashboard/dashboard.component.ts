import {Component, OnDestroy, OnInit} from '@angular/core';
import {LyricsService} from "../../shared/services/lyrics.service";
import {Lyrics} from "../../interfaces/lyrics";
import {Subscription} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {ThemeService} from "../../shared/services/settings/theme.service";
import {UsersService} from "../users.service";
import {User} from "../../interfaces/user";
import {NotificationService} from "../../shared/services/notification.service";
import {GENRES} from "../../shared/mock-genres";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public lyricsList: Lyrics[] = [];
  users: User[] = [];
  searchStr: string = '';
  tagFilter: string[] = [];
  genreList = GENRES;
  lyricsListSub: Subscription | undefined ;
  deleteLyricsSub: Subscription | undefined;
  deleteUserSub: Subscription | undefined;
  theme: string | undefined;
  public endSession: Date | undefined;
  title: string = '';

  constructor(private lyricsService: LyricsService,
              private auth: AuthService,
              private router: Router,
              private themeService: ThemeService,
              private usersService: UsersService,
              private notification: NotificationService) { }

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe( theme => this.theme = theme);
    this.lyricsListSub = this.lyricsService.getAllLyricsList().subscribe( lyrics => {
      this.lyricsList = lyrics;
    });
    this.usersService.getAllUsers().subscribe( (users) => {
      this.users = users;
    })
    this.getAuthTokenExp();
  }


  ngOnDestroy(): void {
    if(this.lyricsListSub){
      this.lyricsListSub.unsubscribe();
    }
    if(this.deleteLyricsSub){
      this.deleteLyricsSub.unsubscribe();
    }
    if(this.deleteUserSub){
      this.deleteUserSub.unsubscribe();
    }
  }

  refreshLyricsList(){
    this.lyricsService.refreshLyricsList();
  }

  removeLyrics(id: string | any, name: string) {
    if(confirm("Are you sure to delete " + name)){
      this.deleteLyricsSub = this.lyricsService.removeLyrics(id).subscribe( () => {
        this.lyricsList = this.lyricsList.filter(list => list.id !== id);
        this.notification.showSuccess('lyrics has been deleted', 'Deleted')
        this.refreshLyricsList();
      })
    }
  }

  removeUser(id: string | any, email: string) {
    if(confirm("Are you sure to delete " + email)) {
      this.deleteUserSub = this.usersService.removeUser(id).subscribe(() => {
        this.users = this.users.filter(list => list.id !== id);
        this.notification.showSuccess('user has been deleted', 'Deleted')
      })
    }
  }

  getAuthTokenExp(){
    this.endSession = this.auth.getAuthTokenExp();
    // @ts-ignore
    this.endSession = new Date(Date.parse(this.endSession));
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.notification.showInfo('session has been finished', 'Logout')
    this.router.navigate(['admin' + '/login']);
  }

  getEndSession(){
    // @ts-ignore
    return this.endSession.toLocaleString();
  }
}
