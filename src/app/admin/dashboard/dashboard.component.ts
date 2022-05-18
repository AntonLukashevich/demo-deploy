import { Component, OnInit } from '@angular/core';
import {LyricsService} from "../../shared/services/lyrics.service";
import {Lyrics} from "../../interfaces/lyrics";
import {Subscription} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {ThemeService} from "../../shared/services/settings/theme.service";
import {UsersService} from "../users.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public lyricsList: Lyrics[] = [];
  users: User[] = [];
  searchStr: string = '';
  lyricsListSub: Subscription | undefined ;
  deleteLyricsSub: Subscription | undefined;
  deleteUserSub: Subscription | undefined;
  theme: string | undefined;
  public endSession: Date | undefined;

  constructor(private lyricsService: LyricsService,
              private auth: AuthService,
              private router: Router,
              private themeService: ThemeService,
              private usersService: UsersService) { }

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


  removeLyrics(id: string | any) {
    this.deleteLyricsSub = this.lyricsService.removeLyrics(id).subscribe( () => {
      this.lyricsList = this.lyricsList.filter(list => list.id !== id);
    })
  }

  removeUser(id: string | any) {
    this.deleteUserSub = this.usersService.removeUser(id).subscribe( () => {
      this.users = this.users.filter(list => list.id !== id);
    })
  }

  getAuthTokenExp(){
    this.endSession = this.auth.getAuthTokenExp();
    // @ts-ignore
    this.endSession = new Date(Date.parse(this.endSession));
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['admin' + '/login']);
  }

  getEndSession(){
    // @ts-ignore
    return this.endSession.toLocaleString();
  }
}
