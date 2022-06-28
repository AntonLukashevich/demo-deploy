import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {LyricsItemComponent} from "./lyrics-item.component";
import {ThemeService} from "../../../services/settings/theme.service";
import {FontService} from "../../../services/settings/font.service";
import {BehaviorSubject} from "rxjs";

describe('LyricsItemComponent', () => {
  let component: LyricsItemComponent;
  let fixture: ComponentFixture<LyricsItemComponent>;
  let themeService: ThemeService;
  let fontService: FontService;
  beforeEach( () => {
    TestBed.configureTestingModule( {
     declarations: [LyricsItemComponent],
     providers: [
       {
         provide: ThemeService,
         useValue: {
           getCurrentTheme: () => new BehaviorSubject('dark')
         }
       },
       {
         provide: FontService,
         useValue: {
           getCurrentLyricFont: () => new BehaviorSubject('comic'),
           getCurrentFontSize: () => new BehaviorSubject(17)
         }
       },
     ]
    })
    fixture = TestBed.createComponent(LyricsItemComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fontService = TestBed.inject(FontService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set dark theme and font, font size after calls ngOnInit', fakeAsync(
    () =>{
      component.ngOnInit();
      tick();
      expect(component.theme).toBe(themeService.getCurrentTheme().value);
      expect(component.font).toBe(fontService.getCurrentLyricFont().value);
      expect(component.fontSize).toBe(fontService.getCurrentFontSize().value);
    }
  ) )

  it('should convert tonality in line', () => {
    let lineBefore = [
      {position: 0, spaces: 0, postfix: 'sus4'},
      {position: 3, spaces: 3, postfix: '6'},
      {position: 7, spaces: 7, postfix: 'm7'},];
    let expectedLine = 'C#sus4    E6        G#m7 ';
    component.cordPosition = 1;
    expect(component.convertLine(lineBefore)).toBe(expectedLine);
  })
})
