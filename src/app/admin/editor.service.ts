import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Lyrics} from "../interfaces/lyrics";
import {map} from "rxjs/operators";
import {LyricsService} from "../shared/services/lyrics.service";

@Injectable()

export class EditorService{
  lyricsText = new BehaviorSubject<any>({});
  genreList: string[] = ['Pop', 'Hip hop', 'Rock', 'Rhythm and blues', 'Soul', 'Reggae', 'Country', 'Funk'];
  itemNameList: string[] = ['couplet', 'chorus', 'bridge', 'interlude'];
  urlAPI = 'https://demo-lyrics-api.herokuapp.com/';

  constructor(private http: HttpClient,
              private router: Router,
              ) {
  }

  selectLyricsText(text: any){
    this.lyricsText.next(text);
    this.router.navigate(['/admin', 'lyrics', 'create_chords']);
  }

  getLyricsText(): Observable<any>{
    return this.lyricsText;
  }

  createLyrics(lyrics: Lyrics): Observable<Lyrics>{
    return this.http.post(this.urlAPI + '/api/lyrics', lyrics)
      .pipe( map( (response: any) => {
        return{
          ...lyrics,
          id: lyrics.id,
          name: lyrics.name,
          tonality: lyrics.tonality,
          comment: lyrics.comment,
          tags: lyrics.tags,
          items: lyrics.items
        }
      }));
  }
}
