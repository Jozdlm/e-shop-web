import { Component, Input, inject } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule, RouterModule, ProductImageDirective],
})
export class ProductCardComponent {
  private readonly _cartService = inject(ShoppingCartService);

  @Input()
  public product!: IProduct;

  public addToCart(product: IProduct): void {
    this._cartService.addToCart(product);
  }
}
