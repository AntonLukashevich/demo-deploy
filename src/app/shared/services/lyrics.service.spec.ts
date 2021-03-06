import {LyricsService} from "./lyrics.service";
import {fakeAsync, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NotificationService} from "./notification/notification.service";
import {LYRICS_MOCK} from "../mock-lyrics";


describe('LyricsService', () => {
  let service: LyricsService;
  let lyricsList = LYRICS_MOCK;
  let singleLyrics = lyricsList[0];
  let localStorageLyricsList = 'lyricsList';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
          LyricsService,
        {provide: NotificationService, useValue: {}}
      ]
    })
    service = TestBed.inject(LyricsService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should #getAllLyricsList()',
    fakeAsync(() => {
      service.getAllLyricsList().subscribe((lyrics) => {
        // @ts-ignore
        expect(service.listLyrics.value).toBe(lyrics);
        localStorage.setItem(localStorageLyricsList, JSON.stringify(lyrics));
        expect(JSON.parse(<string>localStorage.getItem(localStorageLyricsList))).toBeTruthy();
      });
    })
  )

  it('should #getLyricsById()',
    fakeAsync(() => {
      service.getLyricsById(1).subscribe((lyrics: any) => {
        expect(lyrics.id).toBe(1);
      });
    })
  );

  it('should update lyrics', fakeAsync( () => {
    // @ts-ignore
    service.updateLyrics(singleLyrics).subscribe( (res) => {
      expect(res.id).toBe(LYRICS_MOCK[0].id);
    })
  }));

  it('should removeLyrics lyrics', fakeAsync( () => {
    // @ts-ignore
    service.removeLyrics(singleLyrics.id).subscribe( (res) => {
      expect(res).toBe(undefined);
    })
  }));

  it('should return #nextLyricsId()', () => {
    let id = service.nextLyricsId(1);
    expect(id).toBeGreaterThanOrEqual(1);
    expect(JSON.parse(<string>localStorage.getItem(localStorageLyricsList))).toBeTruthy();
  });

  it('should return #previousLyricsId()', () => {
    let id = service.previousLyricsId(2);
    expect(id).toBeLessThanOrEqual(2);
    expect(JSON.parse(<string>localStorage.getItem(localStorageLyricsList))).toBeTruthy();
  });


})
