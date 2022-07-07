import {UsersService} from "./users.service";
import {fakeAsync, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('UsersService', () => {
  let service: UsersService;
  let userParams = {email: 'user@user.com', username: 'User User', password: '123123'}
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ UsersService]
    })
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should #signUp()', fakeAsync(() => {
    service.signUp(userParams).subscribe( (res) => {
      expect(res.email).toBe(userParams.email);
    })
  }));

  it('should #getAllUsers', fakeAsync(() => {
    service.getAllUsers().subscribe( (res) => {
      // @ts-ignore
      expect(service.userList).not.toBeUndefined();
    })
  }));

  it('should #getUserById()',fakeAsync( () => {
    service.getUserById(1).subscribe((res) => {
      expect(res.id).toBeTruthy();
    })
  }));
})
