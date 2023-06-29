import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../user';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string = 'http://localhost:3000';

  constructor() {}

  public getUserById(id: string): Observable<IUser> {
    return this._http.get<IUser>(`${this._apiUrl}/users/${id}`);
  }

  public getUserByEmail(email: string): Observable<IUser> {
    return this._http
      .get<IUser[]>(`${this._apiUrl}/users`, {
        params: { email },
      })
      .pipe(map((users) => users[0]));
  }
}
