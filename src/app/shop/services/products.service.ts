import { Injectable, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/store/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _firestore: Firestore = inject(Firestore);
  private _productsCollection = collection(this._firestore, 'products');

  public products: Signal<IProduct[]> = toSignal(
    collectionData(this._productsCollection) as Observable<IProduct[]>,
    {
      initialValue: [] as IProduct[],
    }
  );

  constructor() {}
}
