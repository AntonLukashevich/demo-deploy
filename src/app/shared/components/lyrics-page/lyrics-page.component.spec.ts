import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LyricsPageComponent } from './lyrics-page.component';
import {ThemeService} from "../../services/settings/theme.service";
import {NotificationService} from "../../services/notification.service";
import {UsersService} from "../../../admin/users.service";
import {LyricsService} from "../../services/lyrics.service";
import {AuthService} from "../../../admin/shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FontService} from "../../services/settings/font.service";
import {MatDialog} from "@angular/material/dialog";

describe('LyricsPageComponent', () => {
  let component: LyricsPageComponent;
  let fixture: ComponentFixture<LyricsPageComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ LyricsPageComponent ],
      providers: [
        {provide: ThemeService, useValue: {}},
        {provide: FontService, useValue: {}},
        {provide: ActivatedRoute, useValue: {}},
        {provide: LyricsService, useValue: {}},
        {provide: MatDialog, useValue: {}},
        {provide: Router, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(LyricsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
