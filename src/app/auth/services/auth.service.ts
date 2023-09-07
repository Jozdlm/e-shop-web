import { toSignal } from '@angular/core/rxjs-interop';
import { Injectable, inject, effect } from '@angular/core';
import { ICreateUser, ILoginUser } from '../auth';
import {
  Auth,
  User,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';
import { BehaviorSubject, Observable, from, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { supaClient } from 'src/app/app.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth: Auth = inject(Auth);
  private _router: Router = inject(Router);
  private _supabase = supaClient;

  public user$ = user(this._auth);
  public user = toSignal<User | null>(this.user$);

  private _sessionSub$ = new BehaviorSubject(null);
  private session$ = new Observable();

  constructor() {
    effect(() => console.log(this.user()));
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

    return data;
  }

  public login(credentials: ILoginUser): Observable<User> {
    const { email, password } = credentials;

    return from(signInWithEmailAndPassword(this._auth, email, password)).pipe(
      tap((_) => this._router.navigateByUrl('')),
      map((value) => value.user)
    );
  }

  public logout(): Observable<void> {
    return from(signOut(this._auth)).pipe(
      tap((_) => this._router.navigateByUrl('/auth'))
    );
  }
}
