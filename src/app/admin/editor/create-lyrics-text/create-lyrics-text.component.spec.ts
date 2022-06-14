import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLyricsTextComponent } from './create-lyrics-text.component';
import {EditorService} from "../../editor.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {LyricsService} from "../../../shared/services/lyrics.service";
import {Router} from "@angular/router";
import {ThemeService} from "../../../shared/services/settings/theme.service";

describe('CreateLyricsTextComponent', () => {
  let component: CreateLyricsTextComponent;
  let fixture: ComponentFixture<CreateLyricsTextComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ CreateLyricsTextComponent ],
      providers: [
        {provide: EditorService, useValue: {}},
        {provide: ThemeService, useValue: {}}
      ]
    })
    fixture = TestBed.createComponent(CreateLyricsTextComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
