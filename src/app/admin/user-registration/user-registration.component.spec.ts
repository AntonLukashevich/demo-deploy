import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationComponent } from './user-registration.component';
import {UsersService} from "../users.service";
import {NotificationService} from "../../shared/services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ThemeService} from "../../shared/services/settings/theme.service";

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegistrationComponent ],
      providers: [
        {provide: UsersService, useValue: {}},
        {provide: NotificationService, useValue: {}},
        {provide: ThemeService, useValue: {}},
        {provide: Router, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
