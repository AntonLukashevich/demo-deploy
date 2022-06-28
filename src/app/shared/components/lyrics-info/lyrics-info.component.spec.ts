import {LyricInfoComponent} from "./lyric-info.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";

describe('LyricInfoComponent', () => {
  let component: LyricInfoComponent;
  let fixture: ComponentFixture<LyricInfoComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [LyricInfoComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })

    fixture = TestBed.createComponent(LyricInfoComponent);
    component = fixture.componentInstance;
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
})
