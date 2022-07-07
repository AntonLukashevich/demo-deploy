import {AuthGuard} from "./auth.guard";
import {fakeAsync, TestBed} from "@angular/core/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {AuthService} from "./auth.service";

describe('AuthGuard', () => {
  let guard = AuthGuard;
  const dummyRoute = {} as ActivatedRouteSnapshot;

  describe('when login', () => {
    beforeEach( () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          AuthGuard,
          {provide: Router, useValue: {
              navigate: () => {}
            }},
          {provide: AuthService, useValue: {
              isAuthenticated: () => {return false},
              logout: () => {}
            }},
        ]
      })
      // @ts-ignore
      guard = TestBed.inject(AuthGuard);
    })

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('grants route access', () => {
      // @ts-ignore
      const canActivate = guard.canActivate(dummyRoute, ['admin' +'/login']);
      expect(canActivate).toBeFalse(); // [3]
    });
  })


  describe('when logout', () => {
    beforeEach( () => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          AuthGuard,
          {provide: Router, useValue: {
              navigate: () => {}
            }},
          {provide: AuthService, useValue: {
              isAuthenticated: () => {return true},
              logout: () => {}
            }},
        ]
      })
      // @ts-ignore
      guard = TestBed.inject(AuthGuard);
    })

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('grants route access', () => {
      // @ts-ignore
      const canActivate = guard.canActivate(dummyRoute, ['admin' +'/login']);

      expect(canActivate).toBeTrue(); // [3]
    });
  })



})
