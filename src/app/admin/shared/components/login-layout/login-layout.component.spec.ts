import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLayoutComponent } from './login-layout.component';
import {Router} from "@angular/router";
import {NotificationService} from "../../../../shared/services/notification.service";
import {ThemeService} from "../../../../shared/services/settings/theme.service";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";


describe('LoginLayoutComponent', () => {
  let component: LoginLayoutComponent;
  let fixture: ComponentFixture<LoginLayoutComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ LoginLayoutComponent ],
      providers: [
        {provide: ThemeService, useValue: {}},
        {provide: HttpClient, useValue: {}},
        {provide: Router, useValue: {}},
        {provide: NotificationService, useValue: {}},
        {provide: ToastrService, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(LoginLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // beforeEach( () => {
  //   // @ts-ignore
  //   service = new AuthService(new HttpClient());
  //   // @ts-ignore
  //   router = new Router();
  //   themeService = new ThemeService();
  //   // @ts-ignore
  //   notification = new NotificationService(new ToastrService());
  //   component = new LoginLayoutComponent(themeService, service, router, notification);
  // })
  //
  // it('should ', () =>{
  //   const  spy = spyOn(service, 'login').and.callFake( () => {
  //     return EMPTY
  //   })
  //
  //
  // })
});
