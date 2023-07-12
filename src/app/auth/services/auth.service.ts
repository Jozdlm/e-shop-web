import { toSignal } from '@angular/core/rxjs-interop';
import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { ICreateUser, ILoginUser, ISession } from '../auth';
import {
  Auth,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Observable, from, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth: Auth = inject(Auth);
  private _router: Router = inject(Router);

  private _currentSession = signal<ISession>({
    id: '1',
    username: 'Jozuan Martinez',
    email: 'jmprueba@example.com',
    token: 'Zwq123fjxjkl3ñ56j5l43d',
  });

  public user$ = user(this._auth);
  public user = toSignal<User | null>(this.user$);

  public currentSession = computed<ISession>(() => {
    return this._currentSession();
  });

  constructor() {
    effect(() => console.log(this.user()));
  }

  public signup(newUser: ICreateUser): Observable<User> {
    const { fullname, email, password } = newUser;

    return from(
      createUserWithEmailAndPassword(this._auth, email, password)
    ).pipe(
      switchMap((userCredentials: UserCredential) => {
        updateProfile(this._auth.currentUser!, { displayName: fullname });

        const user = userCredentials.user;
        return of(user);
      })
    );
  }

  public login(credentials: ILoginUser): Observable<User> {
    const { email, password } = credentials;

    return from(signInWithEmailAndPassword(this._auth, email, password)).pipe(
      tap((_) => this._router.navigate([''])),
      map((value) => value.user)
    );
  }

  public logout(): Observable<void> {
    return from(signOut(this._auth))
      .pipe(
        tap((_) => this._router.navigate(['/auth']))
      );
  }
}
