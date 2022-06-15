import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../services/settings/theme.service";
import {FontService} from "../../services/settings/font.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public currentTheme: string =  'light' ;
  public currentFont: string | undefined;
  public currentFontSize: number = 17;
  public stepFontSize = 1;

  constructor(private themeService: ThemeService,
              private fontService: FontService) { }

  ngOnInit(): void {
    this.currentTheme = this.themeService.getCurrentTheme().value;
    this.currentFont = this.fontService.getCurrentLyricFont().value;
    this.currentFontSize = this.fontService.getCurrentFontSize().value;
  }

  public setTheme(value: string){
    this.currentTheme = value;
    this.themeService.setCurrentTheme(value);
  }

  public setFont(value: string){
    this.currentFont = value;
    this.fontService.setCurrentLyricsFont(value);
  }

  public setFontSize(value: number){
    this.currentFontSize = value;
    this.fontService.setCurrentFontSize(value);
  }
}
