import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, pipe, tap } from 'rxjs';
import { supabase } from 'src/app/app.config';
import { IProduct } from 'src/app/shop/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _http: HttpClient = inject(HttpClient);
  private supabase = supabase;

  constructor() {}

  public getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>('http://localhost:3000/api/products');
  }

  public getRelatedProducts(): Observable<IProduct[]> {
    return this.getProducts().pipe(map((arr) => arr.slice(0, 15)));
  }

  public getProductById(productId: string): Observable<IProduct> {
    return this._http.get<IProduct>('http://localhost:3000/api/products', {
      params: {
        id: productId,
      },
    });
  }
}
