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

  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  public products: Signal<IProduct[]> = toSignal(
    this._products$ as Observable<IProduct[]>,
    {
      initialValue: [] as IProduct[],
    }
  );

  constructor() {
    this.getProducts().then(value => console.log(value));
  }

  public async getProducts() {
    const {data, error} = await this.supabase.from('products').select();

    if(error) {
      throw new Error("Ha ocurrido un error: " + error);
    }

    return data;
  }

  public getProductById(productId: string): Observable<IProduct> {
    const productRef = doc(this._firestore, 'products', productId);
    const product$ = docData(productRef, { idField: 'id' });

    return product$ as Observable<IProduct>;
  }
}
