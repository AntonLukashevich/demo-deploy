import { Component, OnInit } from '@angular/core';
import {LyricsService} from "../../shared/services/lyrics.service";
import {Lyrics} from "../../interfaces/lyrics";
import {Subscription} from "rxjs";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {ThemeService} from "../../shared/services/settings/theme.service";
import {UsersService} from "../users.service";
import {User} from "../../interfaces/user";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../shared/components/confirm-dialog/confirm-dialog.component";

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
  title: string = '';
  message: string = '';

  constructor(private lyricsService: LyricsService,
              private auth: AuthService,
              private router: Router,
              private themeService: ThemeService,
              private usersService: UsersService,
              public dialog: MatDialog) { }

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
        this.refreshLyricsList();
      })
    }
  }

  removeUser(id: string | any, email: string) {
    if(confirm("Are you sure to delete " + email)) {
      this.deleteUserSub = this.usersService.removeUser(id).subscribe(() => {
        this.users = this.users.filter(list => list.id !== id);
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
    this.router.navigate(['admin' + '/login']);
  }

  getEndSession(){
    // @ts-ignore
    return this.endSession.toLocaleString();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {title: this.title, message: this.message},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.message = result;
    })

  }

}
