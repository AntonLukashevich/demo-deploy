import {AuthService} from "./auth.service";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {User} from "../../../interfaces/user";

describe('AuthService', () => {
  const tkn = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.cRSVkjWcS-38pQG8Ibuwy2ghh9Z6-Ohk5QdH0WkrLhk';
  let service: AuthService;
  let user: User = { email: 'user@user.com', password: '123123', username: 'user'};
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    })
    service = TestBed.inject(AuthService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return token', () => {
    localStorage.setItem('user-auth-token', tkn.toString());
    service.login(user);
    expect(service.token).toBe(tkn);

    const expDate = new Date(new Date().getTime());
    let res = {auth_token: tkn, expDate: expDate};
    // @ts-ignore
    service.setToken(res);
    expect(<string>localStorage.getItem('user-auth-token')).toBe(tkn);
  });

  it('should #getAuthTokenExp()', () => {
    const expDate = new Date(new Date().getTime());
    localStorage.setItem('auth-token-exp', expDate.toString());
    expect(service.getAuthTokenExp()).toBe(expDate.toString());
    localStorage.removeItem('auth-token-exp');
    expect(service.getAuthTokenExp()).toBeUndefined();
  });

   it('should #isAuthenticated()', () => {
      expect(service.isAuthenticated()).toBeFalse();
   });

   it('#handleError()', () => {
     let errors = ['INVALID_EMAIL', 'INVALID_PASSWORD', 'EMAIL_NOT_FOUND','INVALID_EMAIL_OR_PASSWORD' ];
     errors.forEach((err: string) => {
       let error = { error: { error: err}};
       // @ts-ignore
       service.handleError(error)
       expect(service.error$.value).toBe('Error! wrong credential! Check your Email or Password')
     })
   })
})
