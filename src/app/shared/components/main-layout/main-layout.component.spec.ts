import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import {ThemeService} from "../../services/settings/theme.service";
import {BehaviorSubject} from "rxjs";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let themeService: ThemeService;
  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ MainLayoutComponent, MatSidenav ],
      providers: [
        {
          provide: ThemeService,
          useValue: {
            getCurrentTheme: () => new BehaviorSubject('dark')
          }
        },
      ]
    })
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set theme after call ngOnInit', fakeAsync( () => {
    component.ngOnInit();
    tick();
    expect(component.theme).toBe(themeService.getCurrentTheme().value);
  }));

  it('#setToggle() should toggle #toggle', () => {
    expect(component.toggle)
      .withContext('close at first')
      .toBe(false);
    component.setToggle();
    expect(component.toggle)
      .withContext('open after click')
      .toBe(true);
    component.setToggle();
    expect(component.toggle)
      .withContext('close after second click')
      .toBe(false);
  });

  it('#animate() should toggle #animationState', () => {
    expect(component.animationState)
      .withContext('close at first')
      .toBe(false);
    component.animate();
    expect(component.animationState)
      .withContext('open after click')
      .toBe(true);
    component.animate();
    expect(component.animationState)
      .withContext('close after second click')
      .toBe(false);
  });

  it('should close sidebar', () => {
    component.closeSidebar();
    expect(component.toggle).toBe(false);
  });

});
