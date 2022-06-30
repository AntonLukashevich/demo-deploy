import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLyricsChordsComponent } from './create-lyrics-chords.component';
import { Router} from "@angular/router";
import {LyricsService} from "../../../shared/services/lyrics.service";
import {EditorService} from "../../editor.service";
import {NotificationService} from "../../../shared/services/notification/notification.service";

describe('CreateLyricsChordsComponent', () => {
  let component: CreateLyricsChordsComponent;
  let fixture: ComponentFixture<CreateLyricsChordsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLyricsChordsComponent ],
      providers: [
        {provide: EditorService, useValue: {}},
        {provide: NotificationService, useValue: {}},
        {provide: LyricsService, useValue: {}},
        {provide: Router, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(CreateLyricsChordsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
