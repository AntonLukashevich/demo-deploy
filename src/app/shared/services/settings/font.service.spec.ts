import {FontService} from "./font.service";
import {TestBed} from "@angular/core/testing";

describe('FontService', () => {
  let service: FontService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FontService]
    });
    service = TestBed.inject(FontService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return #currentLyricsFont', () =>{
    service.setCurrentLyricsFont('comic');
    expect(service.getCurrentLyricFont().value).toBe('comic');
  })

  it('should return #currentFontSize', () =>{
    service.setCurrentFontSize(15);
    expect(service.getCurrentFontSize().value).toBe(15);
  })
})
