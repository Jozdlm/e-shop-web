import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from './product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _apiUrl: string = 'http://localhost:3000/api';
  private _http: HttpClient = inject(HttpClient);

  constructor() {}

  public getCategories(): Observable<Category[]> {
    return this._http.get<Category[]>(`${this._apiUrl}/categories`);
  }
}
