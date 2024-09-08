import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { supabase } from '@app/app.config';
import { Observable, from, map } from 'rxjs';
import { IProduct } from 'src/app/shop/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _http: HttpClient = inject(HttpClient);

  public getProducts(): Observable<IProduct[]> {
    return from(supabase.from('products').select('*')).pipe(
      map((value) => value.data as IProduct[]),
    );
  }

  public getProductsByCategory(categorySlug: string): Observable<IProduct[]> {
    const httpParams = new HttpParams().set('category', categorySlug);
    return this._http.get<IProduct[]>('http://localhost:3000/api/products', {
      params: httpParams,
    });
  }

  public getRelatedProducts(): Observable<IProduct[]> {
    return from(supabase.from('products').select('*').range(0, 15)).pipe(
      map((value) => value.data as IProduct[]),
    );
  }

  public getStarredProducts(): Observable<IProduct[]> {
    return from(supabase.from('products').select('*').range(0, 15)).pipe(
      map((value) => value.data as IProduct[]),
    );
  }

  public getProductById(productId: number): Observable<IProduct | null> {
    return from(supabase.from('products').select('*').eq('id', productId)).pipe(
      map((value) => value.data as IProduct | null),
    );
  }
}
