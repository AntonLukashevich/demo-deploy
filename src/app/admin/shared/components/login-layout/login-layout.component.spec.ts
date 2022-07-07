import {ComponentFixture, fakeAsync, flush, TestBed, tick} from '@angular/core/testing';

import { LoginLayoutComponent } from './login-layout.component';
import {Router} from "@angular/router";
import {NotificationService} from "../../../../shared/services/notification/notification.service";
import {ThemeService} from "../../../../shared/services/settings/theme.service";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {User} from "../../../../interfaces/user";
import {AuthGuard} from "../../services/auth.guard";


describe('LoginLayoutComponent', () => {
  let component: LoginLayoutComponent;
  let fixture: ComponentFixture<LoginLayoutComponent>;
  let themeService: ThemeService;
  let authService: AuthService;
  let user: User = { email: 'user@user.com', password: '123123', username: 'user'};
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ LoginLayoutComponent ],
      providers: [
        AuthGuard,
        {provide: ThemeService, useValue: {getCurrentTheme: () => new BehaviorSubject('dark')}},
        {provide: Router, useValue: {navigate: () => {}}},
        {provide: NotificationService, useValue: {showInfo: () => {}, showError: () => {}}},
        {provide: AuthService, useValue: {
          login: () => new BehaviorSubject(user)
          }},
      ]
    })
    fixture = TestBed.createComponent(LoginLayoutComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set theme after call ngOnInit', fakeAsync( () => {
    component.ngOnInit();
    tick();
    expect(component.theme).toBe(themeService.getCurrentTheme().value);
  }));

  it('should #submit() form', fakeAsync(() => {
    component.ngOnInit();
    tick();
    component.loginForm.controls['email'].setValue("test@test.com");
    component.loginForm.controls['password'].setValue("123456789");
    expect(component.loginForm.valid).toBeTruthy();
    component.submit();
    authService.login(user).subscribe( (value) => {
      expect(value.email).toBe(user.email);
    }, () => {
      expect(component.submitted).toBeFalse();
    });
    component.loginForm.controls['password'].setValue("1");
    component.submit();
    expect(component.loginForm.valid).toBeFalse();
    flush();
  }))
});
