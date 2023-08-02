import { Injectable, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
} from '@angular/fire/firestore';
import { createClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/store/interfaces/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _firestore: Firestore = inject(Firestore);
  private _productsCollection = collection(this._firestore, 'products');
  private _products$ = collectionData(this._productsCollection, {
    idField: 'id',
  });

  private supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor() {}

  public async getProducts(): Promise<IProduct[]> {
    const { data, error } = await this.supabase.from('products').select();

    if (error) {
      throw new Error('Ha ocurrido un error: ' + error);
    }

    return data.map((item) => {
      return { ...item, name: item.title, price: item.selling_price };
    }) as IProduct[];
  }

  public getProductById(productId: string): Observable<IProduct> {
    const productRef = doc(this._firestore, 'products', productId);
    const product$ = docData(productRef, { idField: 'id' });

    return product$ as Observable<IProduct>;
  }
}
