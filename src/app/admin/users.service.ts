import {Injectable} from "@angular/core";
import {User} from "../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Lyrics} from "../interfaces/lyrics";
import {environment} from "../../environments/environment";

@Injectable()
export class UsersService {
  users: User[] = [];
  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  sign_up(userParams: User): Observable<User>{
    return this.http.post<User>(this.url + '/api/users', userParams);
  }

  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/api/users`);
  }

  getUserById(id: any):Observable<User>{
    return this.http.get<User>(`${this.url}/api/users/${id}`);
  }

  updateUser(user: User): Observable<User>{
    return this.http.patch<User>(`${this.url}/api/users/${user.id}`, user)
  }

  removeUser(id: string): Observable<void>{
    return this.http.delete<void>(`${this.url}/api/users/${id}`)
  }
}
