import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLyricsChordsComponent } from './create-lyrics-chords.component';

describe('CreateLyricsChordsComponent', () => {
  let component: CreateLyricsChordsComponent;
  let fixture: ComponentFixture<CreateLyricsChordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLyricsChordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLyricsChordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
