import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IShoppingCart } from '../cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _http: HttpClient = inject(HttpClient);
  private _apiUrl: string = 'http://localhost:3000';

  constructor() {}
}
