import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import {ThemeService} from "../../services/settings/theme.service";
import {LyricsService} from "../../services/lyrics.service";
import {MatMenuModule} from "@angular/material/menu";
import {BehaviorSubject, Observable} from "rxjs";
import {Lyrics} from "../../../interfaces/lyrics";
import {LYRICS_MOCK} from "../../mock-lyrics";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let themeService: ThemeService;
  let lyricsService: LyricsService;
  let lyrics = LYRICS_MOCK;
  let store: { [x: string]: string | null; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [ HomeComponent ],
      providers: [
        {
          provide: ThemeService,
          useValue: {
            getCurrentTheme: () => new BehaviorSubject('dark')
          }
        },
        {
          provide: LyricsService,
          useValue: {
            getAllLyricsList: () => new BehaviorSubject(lyrics),
          }
        }
      ]
    })
    lyricsService = TestBed.inject(LyricsService);
    themeService = TestBed.inject(ThemeService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get an Item', () => {

  });

  it('should set theme after call ngOnInit', fakeAsync( () => {
    component.ngOnInit();
    tick();
    expect(component.theme).toBe(themeService.getCurrentTheme().value);
  }))

  it('should set lyricsList after call ngOnInit', fakeAsync( () => {
    component.ngOnInit();
    tick();
    expect(component.lyricsList.length).toBeGreaterThan(0);
  }))

  it('should set searchTerm', () => {
    let search = 'hey ho';
    component.setSearch(search);
    expect(component.searchTerm).toBe(search);
  })


  it('should set tagFilter', () => {
    let tags = ['Pop', 'Hip Hop'];
    component.setTagsFilter(tags);
    expect(component.tagFilter.length).toBeGreaterThan(0);
    expect(component.tagFilter).toBe(tags);
  })

});


