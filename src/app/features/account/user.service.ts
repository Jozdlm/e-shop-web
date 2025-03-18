import { Injectable, inject } from '@angular/core';
import { IUpdateAccount } from './user.types';
import { AuthService } from '@app/features/auth/auth.service';
import { supabase } from 'src/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _auth: AuthService = inject(AuthService);

  constructor() {}

  public async updateUser(newValues: IUpdateAccount) {
    if (!this._auth.isLogged()) return;

    const { data, error } = await supabase.auth.updateUser({
      email: newValues.email,
      data: {
        fullname: newValues.full_name,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
