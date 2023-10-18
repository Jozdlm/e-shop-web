import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProduct } from 'src/app/shop/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _http: HttpClient = inject(HttpClient);

  public getProducts(): Observable<IProduct[]> {
    return this._http.get<IProduct[]>('http://localhost:3000/api/products');
  }

  public getRelatedProducts(): Observable<IProduct[]> {
    return this.getProducts().pipe(map((arr) => arr.slice(0, 15)));
  }

  public getProductById(productId: number): Observable<IProduct> {
    return this._http.get<IProduct>(
      `http://localhost:3000/api/products/${productId}`
    );
  }
}
