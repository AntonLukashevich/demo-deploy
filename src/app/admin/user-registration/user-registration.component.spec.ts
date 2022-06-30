import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { UserRegistrationComponent } from './user-registration.component';
import {UsersService} from "../users.service";
import {NotificationService} from "../../shared/services/notification/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ThemeService} from "../../shared/services/settings/theme.service";
import {BehaviorSubject} from "rxjs";
import {User} from "../../interfaces/user";

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  let themeService: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegistrationComponent ],
      providers: [
        {provide: UsersService, useValue: {}},
        {provide: NotificationService, useValue: {}},
        {provide: ThemeService, useValue: {getCurrentTheme: () => new BehaviorSubject('dark')}},
        {provide: Router, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form after called OnInit', fakeAsync( () => {
    component.ngOnInit();
    tick();
    expect(component.theme).toBe(themeService.getCurrentTheme().value);
    expect(component.form.get('email')).toBeTruthy();
    expect(component.form.get('password')).toBeTruthy();
    expect(component.form.get('username')).toBeTruthy();
  }))

  it('should return #email()', fakeAsync(() => {
    component.ngOnInit();
    tick();
    component.form.get('email')?.setValue('user@user.com');
    // @ts-ignore
    expect(component.email?.value).toBe('user@user.com');
  }) );

  it('should return #password()', fakeAsync(() => {
    component.ngOnInit();
    tick();
    component.form.get('password')?.setValue('123123');
    // @ts-ignore
    expect(component.password?.value).toBe('123123');
  }) );

  it('should return #username()', fakeAsync(() => {
    component.ngOnInit();
    tick();
    component.form.get('username')?.setValue('user');
    // @ts-ignore
    expect(component.username?.value).toBe('user');
  }) )

  it('should sign_up user',() => {
    component.submitted = true;
    let user: User = { email: 'user@user.com', password: '123123', username: 'user'}

  });
});
