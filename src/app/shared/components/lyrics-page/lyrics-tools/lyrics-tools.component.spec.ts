import {LyricsToolsComponent} from "./lyrics-tools.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {ThemeService} from "../../../services/settings/theme.service";
import {MatDialog} from "@angular/material/dialog";
import {first} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {LyricInfoComponent} from "../../lyrics-info/lyric-info.component";

describe('LyricsToolsComponent', () => {
  let component: LyricsToolsComponent;
  let fixture: ComponentFixture<LyricsToolsComponent>;
  let themeService: ThemeService;
  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ LyricsToolsComponent, LyricInfoComponent],
      providers: [
        { provide: ThemeService,
          useValue: {
            getCurrentTheme: () => new BehaviorSubject('dark')
          }
        },
        {provide: MatDialog, useValue: {}},
      ]
    });
    fixture = TestBed.createComponent(LyricsToolsComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#toggle() should toggle #showChords', () => {
    expect(component.showChords)
      .withContext('off at first')
      .toBe(false);
    component.toggle();
    expect(component.showChords)
      .withContext('on after click')
      .toBe(true);
    component.toggle();
    expect(component.showChords)
      .withContext('off after second click')
      .toBe(false);

    component.changeShowChords
      .pipe(first())
      .subscribe((showChords: Boolean) => {
        expect(showChords).toBe(true)
      });
    component.toggle();
  });

  it('#changeTon() should change tonality', () => {
    expect(component.cordPosition)
      .withContext('0 at first')
      .toBe(0);
    component.changeTon(1);
    expect(component.cordPosition)
      .withContext('1 after click increase')
      .toBe(1);
    component.changeTon(-1);
    expect(component.cordPosition)
      .withContext('0 after click decrease')
      .toBe(0);
  })

  it('should set dark theme after calls ngOnInit',
    fakeAsync( () => {
      component.ngOnInit();
      tick();
      expect(component.theme).toBe(themeService.getCurrentTheme().value);
    })
  )

  it('should open dialog with comment', () => {
    component.openDialog();
    expect(component.openDialog).toHaveBeenCalled();
  })
})

