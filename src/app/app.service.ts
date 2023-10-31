import { Injectable } from '@angular/core';
import { Business } from './common/interfaces/business.type';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _business: Business = {
    name: 'Librería La Joya',
  };

  constructor() {}

  public getBusinessName(): string {
    return this._business.name;
  }
}
