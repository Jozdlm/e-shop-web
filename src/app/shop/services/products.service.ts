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

  public async getProductById(productId: string): Promise<IProduct> {
    const { data, error } = await this.supabase
      .from('products')
      .select()
      .eq('id', productId);

    if (error) throw new Error('Ha ocurrido un error: ' + error);

    return data.map((item) => {
      return { ...item, name: item.title, price: item.selling_price };
    })[0] as IProduct;
  }
}
