import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { CreateLyricsChordsComponent } from './create-lyrics-chords.component';
import { Router} from "@angular/router";
import {LyricsService} from "../../../shared/services/lyrics.service";
import {EditorService} from "../../editor.service";
import {NotificationService} from "../../../shared/services/notification/notification.service";
import {BehaviorSubject} from "rxjs";
import {FormArray} from "@angular/forms";
import {LYRICS_MOCK} from "../../../shared/mock-lyrics";

describe('CreateLyricsChordsComponent', () => {
  let component: CreateLyricsChordsComponent;
  let fixture: ComponentFixture<CreateLyricsChordsComponent>;
  let editorService: EditorService;
  let lyricsTextToTest = {
    "name": "123",
    "tonality": "123",
    "comment": "123",
    "tags": [
      "Pop"
    ],
    "items": [
      {
        "name": "couplet",
        "iText": "First things first\nI'ma say all the words inside my head\nI'm fired up and tired of the way that things have been, oh-ooh\nThe way that things have been, oh-ooh"
      },
      {
        "name": "couplet",
        "iText": "Second thing second\nDon't you tell me what you think that I could be\nI'm the one at the sail, I'm the master of my sea, oh-ooh\nThe master of my sea, oh-ooh"
      }
    ]
  }
  let lyricsTextToParsChords= {
    "name": "123",
    "tonality": "123",
    "comment": "123",
    "tags": [
      "Pop"
    ],
    "items": [
      {
        "name": "couplet",
        "lines": [
          {
            "chords": "    [C]",
            "text": "First things first"
          },
          {
            "chords": " [A][m]",
            "text": "I'ma say all the words inside my head"
          },
          {
            "chords": " [C]",
            "text": "I'm fired up and tired of the way that things have been, oh-ooh"
          },
          {
            "chords": "   [C]",
            "text": "The way that things have been, oh-ooh"
          }
        ]
      },
      {
        "name": "couplet",
        "lines": [
          {
            "chords": "   [A]",
            "text": "Second thing second"
          },
          {
            "chords": "[C]",
            "text": "Don't you tell me what you think that I could be"
          },
          {
            "chords": "[F]",
            "text": "I'm the one at the sail, I'm the master of my sea, oh-ooh"
          },
          {
            "chords": "[C]",
            "text": "The master of my sea, oh-ooh"
          }
        ]
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLyricsChordsComponent ],
      providers: [
        {provide: EditorService, useValue: {
            getLyricsText: () => new BehaviorSubject(lyricsTextToTest),
            prepareBeforeAddChords: () => {},
            createLyrics: () => new BehaviorSubject(lyricsTextToParsChords)
          }},
        {provide: NotificationService, useValue: {}},
        {provide: LyricsService, useValue: {
            getAllLyricsList: () => new BehaviorSubject(LYRICS_MOCK)
          }},
        {provide: Router, useValue: { navigate: () => {}}},
      ]
    })
    fixture = TestBed.createComponent(CreateLyricsChordsComponent);
    component = fixture.componentInstance;
    editorService = TestBed.inject(EditorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set form after call ngOnInit', fakeAsync( () => {
    component.ngOnInit();
    tick();
    editorService.getLyricsText().subscribe( (text) => {
      // @ts-ignore
      expect(component.lyricsText).toBe(text);
    });
    expect(component.form).toBeTruthy();
  }));

  it('should #getItems()', () => {
    fixture.detectChanges()

    expect(component.getItems().length).toBeGreaterThan(0);
  });

  it('should #addItemControl()', () =>{
    fixture.detectChanges();
    let len = (component.form.get('items') as FormArray).controls.length;
    component.addItemControl();
    expect((component.form.get('items') as FormArray).controls.length).toBeGreaterThan(len);
  })

  it('should #addLineControl()', () => {
    fixture.detectChanges();
    let len = ((component.form.get('items') as FormArray).controls[0].get('lines') as FormArray).length;
    component.addLineControl(0);
    expect(((component.form.get('items') as FormArray).controls[0]
      .get('lines') as FormArray).length).toBeGreaterThan(len);
  });

  it('should #removeItemControl()', () => {
    fixture.detectChanges();
    let len = (component.form.get('items') as FormArray).controls.length;
    component.removeItemControl(0);
    expect((component.form.get('items') as FormArray).controls.length).toBeLessThan(len);
  });

  it('should #removeLinesControl()', () => {
    fixture.detectChanges();
    let len = ((component.form.get('items') as FormArray).controls[0].get('lines') as FormArray).length;
    component.removeLinesControl(0,0);
    expect(((component.form.get('items') as FormArray).controls[0]
      .get('lines') as FormArray).length).toBeLessThan(len);
  });

  it('should #selectLyrics()', () => {
    fixture.detectChanges();
    component.form.get('items')?.setValue(lyricsTextToParsChords.items);
    component.selectLyrics();
    // @ts-ignore
    editorService.createLyrics(lyricsTextToParsChords).subscribe((res) => {
      expect(lyricsTextToParsChords.name).toBe(res.name);
    });
  })
});
