import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../interfaces/user";
import {Observable, Subject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  uri = environment.apiUrl;

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
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
      .pipe(
        tap(this.setToken),
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
    console.log('handleError: ', error.error.error);
    const {message} = error.error.error
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
      case 'INVALID_EMAIL_OR_PASSWORD':
        this.error$.next('Error! wrong credential! Check your Email or Password');
        console.log(this.error$);
        break;
    }
    return throwError(error);
  }

}
