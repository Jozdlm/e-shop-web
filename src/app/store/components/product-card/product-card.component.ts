import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: true,
  imports: [CurrencyPipe],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProduct;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {}

  public addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
  }
}
