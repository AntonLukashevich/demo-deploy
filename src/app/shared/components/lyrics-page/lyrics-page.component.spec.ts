import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { LyricsPageComponent } from './lyrics-page.component';
import {ThemeService} from "../../services/settings/theme.service";
import {LyricsService} from "../../services/lyrics.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {LYRICS_MOCK} from "../../mock-lyrics";
import {LyricsToolsComponent} from "./lyrics-tools/lyrics-tools.component";
import { MatDialogModule} from "@angular/material/dialog";
import {RouterTestingModule} from "@angular/router/testing";

describe('LyricsPageComponent', () => {
  let component: LyricsPageComponent;
  let fixture: ComponentFixture<LyricsPageComponent>;
  let themeService: ThemeService;
  let lyricsService: LyricsService;
  let lyrics = LYRICS_MOCK[0];
  let router: Router

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule,
        RouterTestingModule.withRoutes([])],
      declarations: [ LyricsPageComponent, LyricsToolsComponent ],
      providers: [
        {
          provide: ThemeService,
          useValue: {
            getCurrentTheme: () => new BehaviorSubject('dark')
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: new BehaviorSubject({id: 1})
          }
        },
        {
          provide: LyricsService,
          useValue: {
            getLyricsById: () => new BehaviorSubject(lyrics),
            nextLyricsId: () => Number(3),
            previousLyricsId: () => Number(1)
          }
        },
        {provide: Router,
          useValue: {
          navigate: () => { },
          navigateByUrl: () => new Promise(() => {}),
          }},
      ]
    })
    fixture = TestBed.createComponent(LyricsPageComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    lyricsService = TestBed.inject(LyricsService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set theme after call ngOnInit', fakeAsync( () => {
    component.ngOnInit();
    tick();
    expect(component.theme).toBe(themeService.getCurrentTheme().value);
  }));

  it('should set lyrics after call ngOnInit', fakeAsync( () => {
    component.ngOnInit();
    tick();
    expect(component.lyric).toBe(lyricsService.getLyricsById(lyrics.id));
  }));

  it('should set #showChords value', () => {
    let value = true;
    component.toggle(value);
    expect(component.showChords).toBe(true);
  });

  it('should set #cordPosition value', () => {
    let value = 1;
    component.changeTon(value);
    expect(component.cordPosition).toBe(1);
  });

  it('unsubscribe #lyricsSub after call #ngOnDestroy()', () => {
    component.ngOnDestroy();
    expect(component['lyricsSub']).toBeUndefined();
  });


  it('should  redirect to #nextLyrics()', () => {
    let nextId  = 3;
    let currentId = 2;
    let url = 'lyrics/' + nextId;
    const navigateSpy = spyOn(router, 'navigate');
    component.nextLyrics(currentId);
    const expectedUrl = navigateSpy.calls.first()?.args[0];
    expect(expectedUrl).toBe(url);
  });

  it('should  redirect to #previousLyrics()', () => {
    let nextId  = 2;
    let currentId = 3;
    let url = 'lyrics/' + nextId;
    const navigateSpy = spyOn(router, 'navigate');
    component.previousLyrics(currentId);
    const  expectedUrl = navigateSpy.calls.first()?.args[0];
    // @ts-ignore
    //expect(expectedUrl).toHaveBeenCalledWith(url);
    expect(expectedUrl).toBe(url);
  });
});
