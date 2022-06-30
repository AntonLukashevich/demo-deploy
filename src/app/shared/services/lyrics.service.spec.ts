import {LyricsService} from "./lyrics.service";
import {fakeAsync, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NotificationService} from "./notification/notification.service";
import {LYRICS_MOCK} from "../mock-lyrics";


describe('LyricsService', () => {
  let service: LyricsService;
  let lyrics = LYRICS_MOCK;
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
        console.log(lyrics);
        expect(lyrics).toBeTruthy();
      });
      // @ts-ignore
      //expect(service.listLyrics.value.length).toBeGreaterThan(0);
    })
  )

  it('should #getLyricsById()',
    fakeAsync(() => {
      service.getLyricsById(1).subscribe((lyrics: any) => {
        expect(lyrics).toBeTruthy();
      });
    })
  )

  it('should return #nextLyricsId()', () => {
    let id = service.nextLyricsId(1);
    expect(id).toBeGreaterThanOrEqual(1);
  })

  it('should return #previousLyricsId()', () => {
    let id = service.previousLyricsId(2);
    expect(id).toBeLessThanOrEqual(2);
  })
})
