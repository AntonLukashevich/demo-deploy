import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {ThemeService} from "../../shared/services/settings/theme.service";
import {NotificationService} from "../../shared/services/notification.service";
import {UsersService} from "../users.service";
import {LyricsService} from "../../shared/services/lyrics.service";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [
        {provide: ThemeService, useValue: {}},
        {provide: NotificationService, useValue: {}},
        {provide: UsersService, useValue: {}},
        {provide: LyricsService, useValue: {}},
        {provide: AuthService, useValue: {}},
        {provide: Router, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
