import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService{
  private currentTheme = new BehaviorSubject<string>('light');

  constructor() { }

  public getCurrentTheme(): BehaviorSubject<string>{
    return this.currentTheme;
  }

  public setCurrentTheme(theme: string){
    this.currentTheme.next(theme);
    localStorage.setItem('user-current-theme', theme);
  }
}
