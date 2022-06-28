import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {ThemeService} from "../../shared/services/settings/theme.service";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let themeService: ThemeService;
  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        {
          provide: ThemeService,
          useValue: {
            getCurrentTheme: () => new BehaviorSubject('dark')
          }
        },
        {provide: AuthService, useValue: {}},
        {provide: Router, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set dark theme and font, font size after calls ngOnInit',fakeAsync(
    () =>{
      component.ngOnInit();
      tick();
      expect(component.theme).toBe(themeService.getCurrentTheme().value);
    }
  ) )
});
