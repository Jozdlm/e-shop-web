import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BUSINESS_NAME } from '@app/constants';
import { SvgIconComponent } from 'angular-svg-icon';
import { CartService } from '@app/features/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, SvgIconComponent],
  template: `
    <nav class="w-full">
      <div
        class="mx-auto flex w-[90%] max-w-[1200px] items-center justify-between py-3 border-b border-gray-300"
      >
        <div class="flex items-center gap-x-12">
          <a class="block text-lg font-semibold" routerLink="">
            {{ businessName }}
          </a>
          <div class="text-sm flex gap-x-4">
            <a routerLink="">Inicio</a>
            <a routerLink="products">Productos</a>
            <a routerLink="about-us">Sobre mí</a>
            <a routerLink="contact">Contactar</a>
          </div>
        </div>
        <div class="flex items-center gap-x-3">
          <button
            class="flex items-center gap-x-2 rounded p-2"
            routerLink="products"
          >
            <svg-icon src="assets/svg/search.svg" class="icon-md" />
            <span class="text-sm">Buscar</span>
          </button>
          <a routerLink="cart" class="flex items-center gap-x-2 text-sm">
            <svg-icon src="assets/svg/shopping-bag.svg" class="icon-md" />
            <span>
              Carrito {{ cartCount > 9 ? '(+9)' : '(' + cartCount + ')' }}
            </span>
          </a>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent {
  private _cartService: CartService = inject(CartService);
  public businessName: string = BUSINESS_NAME;
  public cartCount: number = 0;

  public constructor() {
    this._cartService.cartCount$.subscribe((value) => (this.cartCount = value));
  }
}
