import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { Pages } from '@app/pages';

@Component({
  imports: [RouterModule],
  selector: 'app-404-page',
  template: `
    <div
      class="mx-auto text-center h-full flex flex-col justify-center items-center"
    >
      <h1 class="text-2xl font-medium mb-4">La página no fue encontrada</h1>
      <p>
        Lo sentimos, no encontramos la página que estabas buscando, por favor
        verifica que la escribiste correctamente.
      </p>
      <a [routerLink]="pages.HOME" class="underline text-blue-900">Regresar a la tienda</a>
    </div>
  `,
})
export class NotFoundPage {
  public pages = Pages;
}
