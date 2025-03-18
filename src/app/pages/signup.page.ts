import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import {
  customEmailValidator,
  passwordMatchValidator,
} from '../features/auth/auth.validators';
import { AuthService } from '../auth/auth.service';
import { ICreateUser } from '../features/auth/auth.types';

@Component({
  imports: [RouterModule, ReactiveFormsModule, ButtonComponent],
  template: `
    <div class="mx-auto grid w-96 grid-cols-1">
      <h1 class="mb-8 justify-self-center text-2xl">Crear una cuenta</h1>

      <form
        [formGroup]="signupForm"
        (ngSubmit)="handleSubmit()"
        autocomplete="off"
        class="mb-8 flex flex-col gap-y-4"
      >
        <div class="flex gap-x-4">
          <div class="flex flex-col">
            <label
              for="first-name"
              class="mb-1.5 text-sm font-medium text-neutral-800"
              >Nombre</label
            >
            <input
              type="text"
              name="first_name"
              id="first-name"
              formControlName="first_name"
              class="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-green-700"
            />

            @if (
              getFormControl('first_name').invalid &&
              getFormControl('first_name').touched
            ) {
              @if (getFormControl('first_name').hasError('required')) {
                <div>
                  <p class="mt-2 text-sm text-red-700">
                    El nombre es requerido
                  </p>
                </div>
              }
              @if (getFormControl('first_name').hasError('minlength')) {
                <div>
                  <p class="mt-2 text-sm text-red-700">
                    El nombre debe tener al menos
                    {{
                      getFormControl('first_name').getError('minlength')
                        .requiredLength
                    }}
                    caracteres
                  </p>
                </div>
              }
            }
          </div>
          <div class="flex flex-col">
            <label
              for="last-name"
              class="mb-1.5 text-sm font-medium text-neutral-800"
              >Apellido</label
            >
            <input
              type="text"
              name="last_name"
              id="last-name"
              formControlName="last_name"
              class="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-green-700"
            />

            @if (
              getFormControl('last_name').invalid &&
              getFormControl('last_name').touched
            ) {
              @if (getFormControl('last_name').hasError('required')) {
                <div>
                  <p class="mt-2 text-sm text-red-700">
                    El apellido es requerido
                  </p>
                </div>
              }
              @if (getFormControl('last_name').hasError('minlength')) {
                <div>
                  <p class="mt-2 text-sm text-red-700">
                    El apellido debe tener al menos
                    {{
                      getFormControl('last_name').getError('minlength')
                        .requiredLength
                    }}
                    caracteres
                  </p>
                </div>
              }
            }
          </div>
        </div>
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

          @if (
            getFormControl('email').invalid && getFormControl('email').touched
          ) {
            @if (getFormControl('email').hasError('required')) {
              <div>
                <p class="mt-2 text-sm text-red-700">
                  El correo electronico es requerido
                </p>
              </div>
            }
            @if (getFormControl('email').hasError('email')) {
              <div>
                <p class="mt-2 text-sm text-red-700">
                  El correo debe ser valido
                </p>
              </div>
            }
          }
        </div>
        <div class="flex gap-x-4">
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

            @if (
              getFormControl('password').invalid &&
              getFormControl('password').touched
            ) {
              @if (getFormControl('password').hasError('required')) {
                <div>
                  <p class="mt-2 text-sm text-red-700">
                    La contraseña es requerida
                  </p>
                </div>
              }
              @if (getFormControl('password').hasError('minlength')) {
                <div>
                  <p class="mt-2 text-sm text-red-700">
                    La contraseña debe tener al menos
                    {{
                      getFormControl('password').getError('minlength')
                        .requiredLength
                    }}
                    caracteres
                  </p>
                </div>
              }
            }
          </div>
          <div class="flex flex-col">
            <label
              for="repeated_pass"
              class="mb-1.5 text-sm font-medium text-neutral-800"
              >Repetir Contraseña</label
            >
            <input
              type="password"
              name="repeated_pass"
              id="repeated_pass"
              formControlName="repeated_password"
              class="rounded-md border border-gray-300 px-3 py-1.5 text-sm focus:outline-green-700"
            />

            @if (
              getFormControl('repeated_password').invalid &&
              getFormControl('repeated_password').touched
            ) {
              @if (getFormControl('repeated_password').hasError('required')) {
                <div>
                  <p class="mt-2 text-sm text-red-700">
                    La contraseña es requerida
                  </p>
                </div>
              }
              @if (getFormControl('repeated_password').hasError('minlength')) {
                <div>
                  <p class="mt-2 text-sm text-red-700">
                    La contraseña debe tener al menos
                    {{
                      getFormControl('repeated_password').getError('minlength')
                        .requiredLength
                    }}
                    caracteres
                  </p>
                </div>
              }
              @if (
                getFormControl('repeated_password').hasError('passwordMismatch')
              ) {
                <div>
                  <p class="mt-2 text-sm text-red-700">
                    Las contraseñas no coinciden
                  </p>
                </div>
              }
            }
          </div>
        </div>
        <app-button
          [fullWidth]="true"
          [disabled]="!signupForm.valid"
          class="mb-6"
        >
          Crear Cuenta
        </app-button>

        @if (signupError()) {
          <div class="rounded bg-red-100 p-4">
            <p class="text-center text-red-800 text-sm">
              El correo electronico que proveíste ya está asociado a una cuenta.
            </p>
          </div>
        }
      </form>

      <p class="text-center">
        ¿Ya tienes cuenta?
        <a routerLink="/auth/login" class="text-green-800 underline"
          >Iniciar Sesión</a
        >
      </p>
    </div>
  `,
})
export class SignupPage {
  private _authService: AuthService = inject(AuthService);
  private _fb: FormBuilder = inject(FormBuilder);

  public signupForm = this._fb.nonNullable.group(
    {
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, customEmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeated_password: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: passwordMatchValidator },
  );

  public signupError = signal<boolean>(false);

  public getFormControl(controlName: string): AbstractControl {
    return this.signupForm.get(controlName)!;
  }

  public handleSubmit(): void {
    if (this.signupForm.valid) {
      const { first_name, last_name, email, password } = this.signupForm.value;

      const newUser: ICreateUser = {
        fullname: `${first_name} ${last_name}`,
        email: email!,
        password: password!,
      };

      this._authService
        .signup(newUser)
        .then((value) => {
          this.signupForm.reset();
          this.signupError.set(false);
        })
        .catch((error) => {
          this.signupError.set(true);
        });
    }
  }
}
