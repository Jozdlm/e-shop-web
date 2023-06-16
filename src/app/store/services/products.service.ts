import { Injectable, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IProduct} from "../interfaces/product";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _apiUrl: string = 'http://localhost:3000';
  private _http: HttpClient = inject(HttpClient);

  constructor() { }

  public getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>(`${this._apiUrl}/products`);
  }

  public getProductById(productId: number): Observable<IProduct> {
    return this._http.get<IProduct>(`${this._apiUrl}/products/${productId}`);
  }
}
