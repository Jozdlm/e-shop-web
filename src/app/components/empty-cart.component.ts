import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pages } from '@app/pages';

@Component({
  selector: 'app-empty-cart',
  imports: [RouterModule],
  template: `
    <div class="h-[240px] w-full flex justify-center items-center mb-10">
      <div class="text-center">
        <p class="text-xl mb-2">Tu carrito de compras está vacío</p>
        <p class="text-sm text-neutral-800 mb-8">
          Si gustas ve a la tienda y agrega algún producto o selecciona alguno
          de tu lista de deseos
        </p>
        <button [routerLink]="pages.HOME" class="btn btn-primary">
          Dar un vistazo a la tienda!
        </button>
      </div>
    </div>
  `,
})
export class EmptyCartComponent {
  public pages = Pages;
}
