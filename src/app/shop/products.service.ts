import { Injectable } from '@angular/core';
import { supabase } from '@app/app.config';
import { Observable, from, map } from 'rxjs';
import { IProduct } from 'src/app/shop/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public getProducts(): Observable<IProduct[]> {
    return from(supabase.from('products').select('*')).pipe(
      map((value) => value.data as IProduct[]),
    );
  }

  public getProductsByCategory(categoryId: number): Observable<IProduct[]> {
    return from(
      supabase.from('products').select('*').eq('category_id', categoryId),
    ).pipe(map((value) => value.data as IProduct[]));
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
      map((value) => {
        if (value.data && value.data[0]) {
          return value.data[0] as IProduct;
        }
        return null;
      }),
    );
  }
}
