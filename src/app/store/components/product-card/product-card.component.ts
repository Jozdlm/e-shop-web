import { Component, Input, inject } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class ProductCardComponent {
  private readonly _cartService = inject(ShoppingCartService);

  @Input() 
  public product!: IProduct;

  public addToCart(product: IProduct): void {
    this._cartService.addToCart(product);
  }
}
