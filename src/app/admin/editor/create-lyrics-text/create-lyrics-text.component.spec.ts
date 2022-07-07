import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { CreateLyricsTextComponent } from './create-lyrics-text.component';
import {EditorService} from "../../editor.service";
import {ThemeService} from "../../../shared/services/settings/theme.service";
import {BehaviorSubject} from "rxjs";
import {FormArray, FormGroup} from "@angular/forms";

describe('CreateLyricsTextComponent', () => {
  let component: CreateLyricsTextComponent;
  let fixture: ComponentFixture<CreateLyricsTextComponent>;
  let themeService: ThemeService;
  let editorService: EditorService;
  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ CreateLyricsTextComponent ],
      providers: [
        {provide: EditorService, useValue: {}},
        {provide: ThemeService, useValue: {getCurrentTheme: () => new BehaviorSubject('dark')}}
      ]
    })
    fixture = TestBed.createComponent(CreateLyricsTextComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    editorService = TestBed.inject(EditorService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set theme after call ngOnInit', fakeAsync( () => {
    component.ngOnInit();
    tick();
    expect(component.theme).toBe(themeService.getCurrentTheme().value);
  }));


  it('should #addItemControl()', () => {
    fixture.detectChanges();
    component.addItemControl();
    expect((component.textForm.get('items') as FormArray).controls.length).toBeGreaterThan(0);
  });

  it('should #removeItemControl()', () => {
    fixture.detectChanges();
    (component.textForm.get('items') as FormArray).push( new FormGroup({}));
    let len = (component.textForm.get('items') as FormArray)?.length
    component.removeItemControl(0);
    expect(len).toBeGreaterThan((component.textForm.get('items') as FormArray)?.length);
  });

  it('should #getItems()', () => {
    fixture.detectChanges();
    expect(component.getItems().length).toBeGreaterThan(0);
  });

  it('should #selectLyricsText()', () => {
    spyOn(component, 'selectLyricsText');
    component.selectLyricsText();
    expect(component.selectLyricsText).toHaveBeenCalled();
  })
});
