import {UsersPanelComponent} from "./users-panel.component";
import {ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {UsersService} from "../../users.service";
import {NotificationService} from "../../../shared/services/notification.service";
import {HttpClientModule} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UsersPanelComponent', () => {
  let component: UsersPanelComponent;
  let fixture: ComponentFixture<UsersPanelComponent>;
  let userService: UsersService;
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UsersPanelComponent],
      providers: [
        {
          provide: UsersService,
          userValue: {
            getAllUsers: () => new BehaviorSubject([
              {email: 'user@user.com', username: 'user'},
              {email: 'user1@user.com', username: 'user1'}
            ])
          }
        },
        {provide: NotificationService, useValue: {}},
      ]
    })
    fixture = TestBed.createComponent(UsersPanelComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set userList after call ngOnInit', fakeAsync( () => {
    component.ngOnInit();
    tick();
    expect(component.users.length).toBeGreaterThan(0);
  }));
})
