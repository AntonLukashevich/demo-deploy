import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLyricsTextComponent } from './create-lyrics-text.component';

describe('CreateLyricsTextComponent', () => {
  let component: CreateLyricsTextComponent;
  let fixture: ComponentFixture<CreateLyricsTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLyricsTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLyricsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
