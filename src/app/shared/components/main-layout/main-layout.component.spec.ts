import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import {ThemeService} from "../../services/settings/theme.service";
import {FontService} from "../../services/settings/font.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LyricsService} from "../../services/lyrics.service";
import {MatDialog} from "@angular/material/dialog";

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainLayoutComponent ],
      providers: [
        {provide: ThemeService, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
