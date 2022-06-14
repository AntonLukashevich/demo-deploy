import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import {ThemeService} from "../../services/settings/theme.service";
import {LyricsService} from "../../services/lyrics.service";
import {FontService} from "../../services/settings/font.service";
import {MatMenuModule} from "@angular/material/menu";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ SettingsComponent ],
      providers: [
        {provide: ThemeService, useValue: {}},
        {provide: FontService, useValue: {}}
      ]
    })
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
