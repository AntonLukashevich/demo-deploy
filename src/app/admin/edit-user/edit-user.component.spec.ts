import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import {ThemeService} from "../../shared/services/settings/theme.service";
import {NotificationService} from "../../shared/services/notification/notification.service";
import {UsersService} from "../users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../../interfaces/user";

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let themeService: ThemeService;
  let usersService: UsersService;
  let notificationService: NotificationService;
  let router: ActivatedRoute;
  let route: Router
  let user: User = { id: 123, email: 'user@user.com', password: '123123', username: 'user'};
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserComponent ],
      providers: [
        {provide: UsersService, useValue: {
            getUserById: () => {
              return of(user);
            },
            updateUser: () => {return of(user)}
          }},
        {provide: NotificationService, useValue: {}},
        {provide: ActivatedRoute, useValue: {
            params: of({id: 123})
          }},
        {provide: Router, useValue: { }},
        {provide: ThemeService, useValue: {getCurrentTheme: () => new BehaviorSubject('dark')}},
      ]
    })
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    usersService = TestBed.inject(UsersService);
    notificationService = TestBed.inject(NotificationService);
    router = TestBed.inject(ActivatedRoute);
    route = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set theme after called OnInit', fakeAsync( () => {
    component.ngOnInit();
    tick();
    expect(component.theme).toBe(themeService.getCurrentTheme().value);

    usersService.getUserById(user.id).subscribe( (user) => {
      expect(component.editForm.get('email')?.value).toBeTruthy();
      expect(component.editForm.get('password')?.value).toBeTruthy();
      expect(component.editForm.get('username')?.value).toBeTruthy();
    })

    router.params.subscribe( (params) => {
      // @ts-ignore
      expect(params['id']).toBe(123);
    });

    expect(component.idSub).toBeTruthy();
    // @ts-ignore
    expect(component.userId).toBe(123);
  }));


  it('should update user', () => {
    spyOn(component, 'updateUser')
    component.updateUser();
    expect(component.updateUser).toHaveBeenCalledTimes(1);
  });

  it('unsubscribe #lyricsSub after call #ngOnDestroy()', () => {
    component.ngOnDestroy();
    expect(component['idSub']).toBeUndefined();
    expect(component['userSub']).toBeUndefined();
  });

  it('should #updateUser()', () => {
    fixture.detectChanges();
    component.updateUser();
    usersService.updateUser(user).subscribe( (res) => {
      route.navigate(['/admin', 'dashboard']);
      expect(res.email).toBe(user.email);
    });
  });

});
