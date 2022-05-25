import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Lyrics} from "../../interfaces/lyrics";
import {tap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})

export class LyricsService{
  private listLyrics = new BehaviorSubject<Lyrics[]>([]);
  private localStorageLyricsList = 'lyricsList';
  private url: string = environment.apiUrl;

  constructor( private http: HttpClient, private notification: NotificationService) {
  }

  getAllLyricsList():Observable<Lyrics[]>{
    if(localStorage.getItem(this.localStorageLyricsList)){
      this.listLyrics.next(JSON.parse(<string>localStorage.getItem(this.localStorageLyricsList)));
    } else {
      this.http.get<Lyrics[]>(this.url + '/api/lyrics')
        .pipe(
          tap((result: Lyrics[]) => {
            this.listLyrics.next(result);
            localStorage.setItem(this.localStorageLyricsList, JSON.stringify(this.listLyrics.value));
          })
        ).subscribe();
    }
    return this.listLyrics;
  }

  getLyricsById(id: number): any{
    if(localStorage.getItem(this.localStorageLyricsList)) {
      const lyricsList = JSON.parse(<string>(localStorage.getItem(this.localStorageLyricsList)));
      return lyricsList.find((item: any) => item.id.toString() === id.toString());
    } else {
      return this.http.get<Lyrics>(`${this.url}/api/lyrics/${id}`)
        .pipe(tap( (lyrics: Lyrics ) => {
          return lyrics;
        }))
    }
  }

  updateLyrics(lyrics: Lyrics): Observable<Lyrics>{
    return this.http.patch<Lyrics>(`${this.url}/api/lyrics/${lyrics.id}`, lyrics)
  }


  removeLyrics(id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/api/lyrics/${id}`)
  }


  refreshLyricsList(){
    if(localStorage.getItem(this.localStorageLyricsList)){
      localStorage.removeItem('localStorageLyricsList')
    }
    this.http.get<Lyrics[]>(this.url + '/api/lyrics')
      .pipe(
        tap((result: Lyrics[]) => {
          this.listLyrics.next(result);
          localStorage.setItem(this.localStorageLyricsList, JSON.stringify(this.listLyrics.value));
          this.notification.showInfo('List of Lyrics has been refreshed', 'Lyrics')
        })
      ).subscribe();
  }
}
