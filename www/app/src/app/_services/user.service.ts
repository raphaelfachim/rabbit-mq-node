import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../_models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api: string = 'http://localhost:3333/';

  constructor(
    private http: HttpClient
  ) { }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.api + 'users/new', user);
  }
}
