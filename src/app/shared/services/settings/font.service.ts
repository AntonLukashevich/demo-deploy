import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class FontService{
  private localStorageForLyricsFont = 'user-current-lyrics-font';
  private currentLyricsFont = new BehaviorSubject<string>('default');
  private currentFontSize = new BehaviorSubject<number>(17);
  private localStorageForLyricFontSize = 'user-current-lyrics-font-size';

  constructor() {
    if(localStorage.getItem(this.localStorageForLyricsFont)){
      this.currentLyricsFont.next(<string>localStorage.getItem(this.localStorageForLyricsFont));
    } else {
      this.setCurrentLyricsFont('default');
    }

    if(localStorage.getItem(this.localStorageForLyricFontSize)){
      const value = localStorage.getItem(this.localStorageForLyricFontSize);
      this.currentFontSize.next(Number(value));
    }
  }

  getCurrentLyricFont(): BehaviorSubject<string>{
    return this.currentLyricsFont;
  }

  setCurrentLyricsFont(font: string){
    this.currentLyricsFont.next(font);
    localStorage.setItem('user-current-lyrics-font', font);
  }

  getCurrentFontSize():BehaviorSubject<number>{
    return this.currentFontSize;
  }

  setCurrentFontSize(size: number){
    this.currentFontSize.next(size);
    localStorage.setItem(this.localStorageForLyricFontSize, String(size));
  }
}
