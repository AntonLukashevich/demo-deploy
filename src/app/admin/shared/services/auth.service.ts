import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../../../interfaces/user";
import {Observable, Subject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  uri = 'https://demo-lyrics-api.herokuapp.com/';
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {
  }

  get token(): string | null {
    // @ts-ignore
    const expDate = new Date(localStorage.getItem('auth-token-exp'));
    if(new Date() > expDate){
      this.logout();
      return null;
    }
    return <string>localStorage.getItem('user-auth-token');
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return this.http.post(this.uri + '/auth_user', user)
      .pipe(tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  getAuthTokenExp(): any{
    if(localStorage.getItem('auth-token-exp')){
      return localStorage.getItem('auth-token-exp');
    } else {
      return ;
    }
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private setToken(response: any | null){
    if(response){
      const expDate = new Date(new Date().getTime() + +response.auth_token_exp * 1000);
      localStorage.setItem('user-auth-token', response.auth_token);
      localStorage.setItem('auth-token-exp', expDate.toString());
    } else {
      localStorage.removeItem('user-auth-token');
      localStorage.removeItem('auth-token-exp');
    }
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.errors
    switch(message){
      case 'INVALID_EMAIL':
        this.error$.next('something is wrong with your EMAIL,dude');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('r u sure your password is correct?');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('no EMAIL like yours');
        break;
    }
    return throwError(error);
  }

}
