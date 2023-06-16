import { Injectable, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProduct} from "../interfaces/product";

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
}
