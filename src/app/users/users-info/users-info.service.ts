import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {User} from "../user";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersInfoService {
  url = "https://jsonplaceholder.typicode.com/users";

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, httpOptions);
  }

  updateUser(user: User): Observable<User> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

    return this.http.put<User>(`${this.url}/${user.id}`, user, httpOptions);
  }

  deleteUser(id: number): Observable<unknown> {
    return this.http.delete(`${this.url}/${id}`, httpOptions);
  }
}
