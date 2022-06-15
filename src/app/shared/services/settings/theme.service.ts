import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService{
  private currentTheme = new BehaviorSubject<string>('light');
  private localStorageForTheme = 'user-current-theme';

  constructor() {
    if(localStorage.getItem(this.localStorageForTheme)){
      this.currentTheme.next(<string>localStorage.getItem(this.localStorageForTheme));
    }
  }

  public getCurrentTheme(): BehaviorSubject<string>{
    return this.currentTheme;
  }

  public setCurrentTheme(theme: string){
    this.currentTheme.next(theme);
    localStorage.setItem('user-current-theme', theme);
  }
}
