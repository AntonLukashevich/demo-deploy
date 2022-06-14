import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLyricsComponent } from './edit-lyrics.component';
import {ThemeService} from "../../shared/services/settings/theme.service";
import {NotificationService} from "../../shared/services/notification.service";
import {UsersService} from "../users.service";
import {LyricsService} from "../../shared/services/lyrics.service";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EditorService} from "../editor.service";

describe('EditLyricsComponent', () => {
  let component: EditLyricsComponent;
  let fixture: ComponentFixture<EditLyricsComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ EditLyricsComponent ],
      providers: [
        {provide: LyricsService, useValue: {}},
        {provide: EditorService, useValue: {}},
        {provide: ActivatedRoute, useValue: {}},
        {provide: Router, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(EditLyricsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
