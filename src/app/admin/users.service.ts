import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {Lyrics} from "../interfaces/lyrics";

@Injectable()
export class UsersService {
  private url: string = environment.apiUrl;
  private userList = new BehaviorSubject<User[]>([]);
  constructor(private http: HttpClient) {
  }

  public signUp(userParams: User): Observable<User>{
    return this.http.post<User>(this.url + '/api/users', userParams);
  }

  public getAllUsers():Observable<User[]>{
    this.http.get<User[]>(`${this.url}/api/users`)
      .pipe(
        tap( (result: User[]) => {
          this.userList.next(result);
        })
    ).subscribe();
    return this.userList;
  }

  public getUserById(id: any):Observable<User>{
    return this.http.get<User>(`${this.url}/api/users/${id}`);
  }

  public updateUser(user: User): Observable<User>{
    return this.http.patch<User>(`${this.url}/api/users/${user.id}`, user)
  }

  public removeUser(id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/api/users/${id}`)
  }
}
