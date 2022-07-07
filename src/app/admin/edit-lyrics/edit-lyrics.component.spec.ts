import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { EditLyricsComponent } from './edit-lyrics.component';
import {LyricsService} from "../../shared/services/lyrics.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EditorService} from "../editor.service";
import {of} from "rxjs";
import {LYRICS_MOCK} from "../../shared/mock-lyrics";

describe('EditLyricsComponent', () => {
  let component: EditLyricsComponent;
  let fixture: ComponentFixture<EditLyricsComponent>;
  let lyrics = {"id": 1,
    "name": "Beatles - Yesterday",
    "tonality": "F",
    "comment": "sing",
    "items": [
      {
        "name": "couplet",
        "lines": [
          {
            "chords": [
              {
                "position": 5,
                "postfix": "",
                "spaces": 7
              }
            ],
            "text": "Yesterday"
          },
          {
            "chords": [
              {
                "position": 4,
                "postfix": "m7",
                "spaces": 2
              },
              {
                "position": 9,
                "postfix": "7",
                "spaces": 7
              },
              {
                "position": 2,
                "postfix": "m",
                "spaces": 14
              },
              {
                "position": 2,
                "postfix": "",
                "spaces": 1
              },
              {
                "position": 0,
                "postfix": "",
                "spaces": 0
              }
            ],
            "text": "All my troubles seemed so far away"
          },
          {
            "chords": [
              {
                "position": 10,
                "postfix": "",
                "spaces": 2
              },
              {
                "position": 0,
                "postfix": "",
                "spaces": 13
              },
              {
                "position": 5,
                "postfix": "",
                "spaces": 25
              }
            ],
            "text": "Now it looks as though they're here to stay"
          },
          {
            "chords": [
              {
                "position": 2,
                "postfix": "m",
                "spaces": 2
              },
              {
                "position": 7,
                "postfix": "",
                "spaces": 7
              },
              {
                "position": 10,
                "postfix": "",
                "spaces": 3
              },
              {
                "position": 5,
                "postfix": "",
                "spaces": 6
              }
            ],
            "text": "Oh I believe in yesterday"
          }
        ]
      },
      {
        "name": "couplet",
        "lines": [
          {
            "chords": [
              {
                "position": 5,
                "postfix": "",
                "spaces": 7
              }
            ],
            "text": "Suddenly"
          },
          {
            "chords": [
              {
                "position": 4,
                "postfix": "m7",
                "spaces": 2
              },
              {
                "position": 9,
                "postfix": "7",
                "spaces": 7
              },
              {
                "position": 2,
                "postfix": "m",
                "spaces": 14
              },
              {
                "position": 2,
                "postfix": "",
                "spaces": 1
              },
              {
                "position": 0,
                "postfix": "",
                "spaces": 0
              }
            ],
            "text": "I'm not half the man I used to be"
          },
          {
            "chords": [
              {
                "position": 10,
                "postfix": "",
                "spaces": 2
              },
              {
                "position": 0,
                "postfix": "",
                "spaces": 13
              },
              {
                "position": 5,
                "postfix": "",
                "spaces": 25
              }
            ],
            "text": "There's a shadow hanging over me"
          },
          {
            "chords": [
              {
                "position": 2,
                "postfix": "m",
                "spaces": 2
              },
              {
                "position": 7,
                "postfix": "",
                "spaces": 7
              },
              {
                "position": 10,
                "postfix": "",
                "spaces": 3
              },
              {
                "position": 5,
                "postfix": "",
                "spaces": 6
              }
            ],
            "text": "Oh yesterday came suddenly"
          }
        ]
      },
      {
        "name": "chorus",
        "lines": [
          {
            "chords": [
              {
                "position": 9,
                "postfix": "",
                "spaces": 2
              },
              {
                "position": 9,
                "postfix": "7",
                "spaces": 1
              },
              {
                "position": 2,
                "postfix": "m7",
                "spaces": 2
              },
              {
                "position": 0,
                "postfix": "",
                "spaces": 1
              },
              {
                "position": 10,
                "postfix": "",
                "spaces": 2
              },
              {
                "position": 7,
                "postfix": "m",
                "spaces": 10
              }
            ],
            "text": "Why she had to go I don't know"
          },
          {
            "chords": [
              {
                "position": 0,
                "postfix": "",
                "spaces": 7
              },
              {
                "position": 5,
                "postfix": "",
                "spaces": 9
              }
            ],
            "text": "she wouldn't say"
          },
          {
            "chords": [
              {
                "position": 9,
                "postfix": "",
                "spaces": 2
              },
              {
                "position": 9,
                "postfix": "7",
                "spaces": 1
              },
              {
                "position": 2,
                "postfix": "m7",
                "spaces": 2
              },
              {
                "position": 0,
                "postfix": "",
                "spaces": 1
              },
              {
                "position": 10,
                "postfix": "",
                "spaces": 2
              },
              {
                "position": 7,
                "postfix": "m",
                "spaces": 10
              }
            ],
            "text": "I said something wrong now I long"
          },
          {
            "chords": [
              {
                "position": 0,
                "postfix": "",
                "spaces": 7
              },
              {
                "position": 5,
                "postfix": "",
                "spaces": 9
              }
            ],
            "text": "for yesterda-a-a-ay"
          }
        ]
      },
      {
        "name": "couplet",
        "lines": [
          {
            "chords": [
              {
                "position": 5,
                "postfix": "",
                "spaces": 7
              }
            ],
            "text": "Yesterday"
          },
          {
            "chords": [
              {
                "position": 4,
                "postfix": "m7",
                "spaces": 2
              },
              {
                "position": 9,
                "postfix": "7",
                "spaces": 7
              },
              {
                "position": 2,
                "postfix": "m",
                "spaces": 14
              },
              {
                "position": 2,
                "postfix": "",
                "spaces": 1
              },
              {
                "position": 0,
                "postfix": "",
                "spaces": 0
              }
            ],
            "text": "Love was such an easy game to play"
          },
          {
            "chords": [
              {
                "position": 10,
                "postfix": "",
                "spaces": 2
              },
              {
                "position": 0,
                "postfix": "",
                "spaces": 13
              },
              {
                "position": 5,
                "postfix": "",
                "spaces": 25
              }
            ],
            "text": "Now I need a place to hide away"
          },
          {
            "chords": [
              {
                "position": 2,
                "postfix": "m",
                "spaces": 2
              },
              {
                "position": 7,
                "postfix": "",
                "spaces": 7
              },
              {
                "position": 10,
                "postfix": "",
                "spaces": 3
              },
              {
                "position": 5,
                "postfix": "",
                "spaces": 6
              }
            ],
            "text": "Oh I believe in yesterday"
          }
        ]
      }
    ],
    "created_at": "2022-05-26T12:05:14.229Z",
    "updated_at": "2022-06-20T13:59:11.089Z",
    "tags": [
      "Rock",
      "Rhythm and blues"
    ],
    "order": []};
  let router: ActivatedRoute;
  let lyricsService: LyricsService;
  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ EditLyricsComponent ],
      providers: [
        {provide: LyricsService, useValue: {
            getLyricsById: () => {
              return of(lyrics);
            }
          }},
        {provide: EditorService, useValue: {}},
        {provide: ActivatedRoute, useValue: { params: of({id: lyrics.id})}},
        {provide: Router, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(EditLyricsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(ActivatedRoute);
    lyricsService = TestBed.inject(LyricsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set lyricsID after called ngOnInit', fakeAsync(() => {
    component.ngOnInit();
    tick();
    // @ts-ignore
    component.lyrics = lyrics;
    router.params.subscribe( (params) => {
      // @ts-ignore
      expect(params['id']).toBe(lyrics.id);
      // @ts-ignore
      expect(component.lyrics).toBeTruthy();
    })
  }));

});
