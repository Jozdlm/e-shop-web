import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { BusinessInfo } from './app';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _firestore: Firestore = inject(Firestore);

  constructor() {}

  public async getBusinessInfo(): Promise<BusinessInfo | undefined> {
    const docRef = doc(this._firestore, 'business', 'info');
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;

    return docSnap.data() as BusinessInfo;
  }
}
