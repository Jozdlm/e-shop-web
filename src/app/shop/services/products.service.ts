import { Injectable } from '@angular/core';
import { supabase } from 'src/app/app.config';
import { IProduct } from 'src/app/shop/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private supabase = supabase;

  constructor() {}

  public async getProducts(): Promise<IProduct[]> {
    const { data, error } = await this.supabase.from('products').select();

    if (error) throw new Error('Ha ocurrido un error: ' + error);

    return data.map((item) => {
      return { ...item, name: item.title, price: item.selling_price };
    }) as IProduct[];
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
