import { Injectable, inject } from '@angular/core';
import { IUpdateAccount } from '../user';
import { updateEmail, updateProfile } from '@angular/fire/auth';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _auth: AuthService = inject(AuthService);

  constructor() {}

  public updateUser(newValues: IUpdateAccount): void {
    const user = this._auth.user();

    if (!user) return;

    updateEmail(user, newValues.email)
    updateProfile(user, { displayName: newValues.full_name })
  }
}
