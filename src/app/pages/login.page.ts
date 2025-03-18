import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@app/components/button/button.component';
import { RouterModule } from '@angular/router';
import { customEmailValidator } from '../features/auth/auth.validators';
import { AuthService } from '@app/features/auth/auth.service';
import { ILoginUser } from '../features/auth/auth.types';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterModule, ButtonComponent],
  template: `
    <div class="mx-auto grid w-96 grid-cols-1">
      <h1 class="mb-8 justify-self-center text-2xl">Iniciar Sesión</h1>

      <form
        autocomplete="off"
        class="mb-8 flex flex-col gap-y-4"
        [formGroup]="loginForm"
        (ngSubmit)="handleSubmitForm()"
      >
        <div class="flex flex-col">
          <label for="email" class="mb-1.5 text-sm font-medium text-neutral-800"
            >Correo</label
          >
          <input
            type="text"
            name="email"
            id="email"
            formControlName="email"
            class="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-green-700"
          />

          @if (emailControl.invalid && emailControl.touched) {
            @if (emailControl.hasError('required')) {
              <div>
                <p class="mt-2 text-sm text-red-700">
                  El correo electronico es obligatorio
                </p>
              </div>
            }
            @if (emailControl.hasError('email')) {
              <div>
                <p class="mt-2 text-sm text-red-700">
                  El correo electronico debe ser valido
                </p>
              </div>
            }
          }
        </div>
        <div class="flex flex-col">
          <label
            for="password"
            class="mb-1.5 text-sm font-medium text-neutral-800"
            >Contraseña</label
          >
          <input
            type="password"
            name="password"
            id="password"
            formControlName="password"
            class="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-green-700"
          />

          @if (passwordControl.invalid && passwordControl.touched) {
            @if (passwordControl.hasError('required')) {
              <div>
                <p class="mt-2 text-sm text-red-700">
                  La contraseña es obligatoria
                </p>
              </div>
            }
            @if (passwordControl.hasError('minlength')) {
              <div>
                <p class="mt-2 text-sm text-red-700">
                  La contraseña debe tener al menos
                  {{ passwordControl.getError('minlength').requiredLength }}
                </p>
              </div>
            }
          }
        </div>
        <app-button
          [fullWidth]="true"
          [disabled]="loginForm.invalid && loginForm.touched"
          class="mb-2"
        >
          Iniciar Sesión
        </app-button>

        @if (loginError()) {
          <div class="rounded bg-red-100 p-4">
            <p class="text-center text-red-800 text-sm">
              Correo y/o Contraseña incorrectos, por favor verifica la
              información.
            </p>
          </div>
        }
      </form>

      <p class="text-center">
        ¿No tienes cuenta?
        <a routerLink="/auth/signup" class="text-green-800 underline"
          >Crear una cuenta</a
        >
      </p>
    </div>
  `,
})
export class LoginPage {
  private _fb: FormBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);

  public loginForm = this._fb.nonNullable.group({
    email: ['', [Validators.required, customEmailValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public loginError = signal<boolean>(false);

  public get emailControl(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  public get passwordControl(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  public handleSubmitForm(): void {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      const credentials: ILoginUser = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this._authService
        .login(credentials)
        .then((data) => {
          this.loginForm.reset();
          this.loginError.set(false);
        })
        .catch((error) => {
          this.loginError.set(true);
        });
    }
  }
}
