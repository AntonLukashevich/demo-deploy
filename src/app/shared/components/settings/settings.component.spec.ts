import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {ThemeService} from "../../services/settings/theme.service";

import {FontService} from "../../services/settings/font.service";
import {MatMenuModule} from "@angular/material/menu";
import {BehaviorSubject} from "rxjs";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let themeService: ThemeService;
  let fontService: FontService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ SettingsComponent ],
      providers: [
        {
          provide: ThemeService,
          useValue: {
            getCurrentTheme: () => new BehaviorSubject('dark'),
            setCurrentTheme: () => new BehaviorSubject('light')
          }
        },
        {
          provide: FontService,
          useValue: {
            getCurrentLyricFont: () => new BehaviorSubject('comic'),
            getCurrentFontSize: () => new BehaviorSubject(17),
            setCurrentLyricsFont: () => new BehaviorSubject('lobster'),
            setCurrentFontSize: () => new BehaviorSubject(16)
          }
        }
      ]
    })
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fontService = TestBed.inject(FontService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set dark theme and font, font size after calls ngOnInit', fakeAsync(
    () =>{
      component.ngOnInit();
      tick();
      expect(component.currentTheme).toBe(themeService.getCurrentTheme().value);
      expect(component.currentFont).toBe(fontService.getCurrentLyricFont().value);
      expect(component.currentFontSize).toBe(fontService.getCurrentFontSize().value);
    }
  ) )

  it('should set theme', () => {
    let themeValue = 'green';
    component.setTheme(themeValue);
    expect(component.currentTheme).toBe('green');
  })

  it('should set font style', () => {
    let fontValue = 'default';
    component.setFont(fontValue);
    expect(component.currentFont).toBe('default');
  })

  it('should set font size', () => {
    let fontValue = 10;
    component.setFontSize(fontValue);
    expect(component.currentFontSize).toBe(10);
  })
});
