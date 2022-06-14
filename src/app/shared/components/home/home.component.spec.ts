import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {ThemeService} from "../../services/settings/theme.service";
import {LyricsService} from "../../services/lyrics.service";
import {MatMenuModule} from "@angular/material/menu";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ HomeComponent ],
      providers: [
        {provide: ThemeService, useValue: {}},
        {provide: LyricsService, useValue: {}}
      ]
    })
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
