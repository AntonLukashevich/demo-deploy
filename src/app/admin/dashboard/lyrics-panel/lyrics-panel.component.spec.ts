import {LyricsPanelComponent} from "./lyrics-panel.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {NotificationService} from "../../../shared/services/notification/notification.service";
import {LyricsService} from "../../../shared/services/lyrics.service";
import {LYRICS_MOCK} from "../../../shared/mock-lyrics";
import {BehaviorSubject} from "rxjs";

describe('LyricsPanelComponent', () => {
  let component: LyricsPanelComponent;
  let fixture: ComponentFixture<LyricsPanelComponent>;
  let lyricsService: LyricsService;
  let lyrics = LYRICS_MOCK;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [LyricsPanelComponent],
      providers: [
        {provide: NotificationService, useValue: {}},
        {
          provide: LyricsService,
          useValue: {
            getAllLyricsList: () => new BehaviorSubject(lyrics),
            // refreshLyricsList: () => new BehaviorSubject(lyrics)
          }
        },
      ]
    })
    fixture = TestBed.createComponent(LyricsPanelComponent);
    component = fixture.componentInstance;
    lyricsService = TestBed.inject(LyricsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  it('should refresh lyrics list', () => {
    spyOn(component, 'refreshLyricsList');
    component.refreshLyricsList();
    expect(component.refreshLyricsList).toHaveBeenCalled();
  })

  it('should remove lyrics by id', () => {

  })
})
