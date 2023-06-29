import { Injectable, signal, computed } from '@angular/core';
import { ISession } from '../session';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentSession = signal<ISession>({
    id: '1',
    username: 'Jozuan Martinez',
    email: 'jmprueba@example.com',
    token: 'Zwq123fjxjkl3ñ56j5l43d'
  });

  public currentSession = computed<ISession>(() => {
    return this._currentSession();
  })

  constructor() {}
}
