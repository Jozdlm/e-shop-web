import { Injectable } from '@angular/core';
import { BusinessInfo } from './app';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _business: BusinessInfo = {
    name: 'Librería La Joya',
  };

  constructor() {}

  public getBusinessName(): string {
    return this._business.name;
  }
}
