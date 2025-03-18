import { Injectable, inject, signal } from '@angular/core';
import { ICreateUser, ILoginUser } from './auth';
import { Router } from '@angular/router';
import { supabase } from 'src/app/app.config';
import { Session, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _router: Router = inject(Router);
  private _previousRoute: string | null = null;
  public user = signal<User | null>(null);
  public isLogged = signal<boolean>(false);
  public session: Session | null = null;

  constructor() {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') {
        this.isLogged.set(true);
        this.session = session;
      }
      if (event == 'SIGNED_OUT') {
        this.isLogged.set(false);
        this.session = null;
        this._previousRoute = null;
      }
    });
  }

  public set previousRoute(route: string) {
    this._previousRoute = route;
  }

  public async signup(newUser: ICreateUser) {
    const { fullname, email, password } = newUser;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { fullname } },
    });

    if (error) {
      throw new Error(error.message);
    }

    // Navigate to email verification message

    return data;
  }

  public async login(credentials: ILoginUser) {
    const { email, password } = credentials;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    this.user.set(data.user);

    if(this._previousRoute) {
      this._router.navigateByUrl('/checkout');
    } else {
      this._router.navigateByUrl('');
    }

    return data;
  }

  public async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    this.user.set(null);
    this._router.navigateByUrl('auth/login');
  }
}
