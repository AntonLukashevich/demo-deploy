import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import {ThemeService} from "../../shared/services/settings/theme.service";
import {NotificationService} from "../../shared/services/notification.service";
import {UsersService} from "../users.service";
import {LyricsService} from "../../shared/services/lyrics.service";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserComponent ],
      providers: [
        {provide: UsersService, useValue: {}},
        {provide: NotificationService, useValue: {}},
        {provide: ActivatedRoute, useValue: {}},
        {provide: Router, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
