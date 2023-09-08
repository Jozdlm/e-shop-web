import { toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, signal } from '@angular/core';
import { ICreateUser, ILoginUser } from '../auth';
import {
  Auth,
  User,
  signInWithEmailAndPassword,
  user,
} from '@angular/fire/auth';
import { Observable, from, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { supabase } from 'src/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth: Auth = inject(Auth);
  private _router: Router = inject(Router);
  private _supabase = supabase;

  public user$ = user(this._auth);
  public user = toSignal<User | null>(this.user$);

  public isLogged = signal<boolean>(false);

  constructor() {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') this.isLogged.set(true);
      if (event == 'SIGNED_OUT') this.isLogged.set(false);
    });
  }

  public async signup(newUser: ICreateUser) {
    const { fullname, email, password } = newUser;

    const { data, error } = await this._supabase.auth.signUp({
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

  public login(credentials: ILoginUser): Observable<User> {
    const { email, password } = credentials;

    return from(signInWithEmailAndPassword(this._auth, email, password)).pipe(
      tap((_) => this._router.navigateByUrl('')),
      map((value) => value.user)
    );
  }

  public async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }

    this._router.navigateByUrl('auth/login');
  }
}
