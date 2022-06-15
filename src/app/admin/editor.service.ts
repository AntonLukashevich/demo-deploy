import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Lyrics} from "../interfaces/lyrics";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable()

export class EditorService{
  private lyricsText = new BehaviorSubject<any>({});
  public genreList: string[] = ['Pop', 'Hip hop', 'Rock', 'Rhythm and blues', 'Soul', 'Reggae', 'Country', 'Funk'];
  private urlAPI = environment.apiUrl;

  constructor(private http: HttpClient,
              private router: Router) {}

  public selectLyricsText(text: any){
    this.lyricsText.next(text);
    this.router.navigate(['/admin', 'lyrics', 'create_chords']);
  }

  public getLyricsText(): Observable<any>{
    return this.lyricsText;
  }

  public createLyrics(lyrics: Lyrics): Observable<Lyrics>{
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
