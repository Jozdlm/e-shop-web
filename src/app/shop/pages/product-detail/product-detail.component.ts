import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { ProductsService } from 'src/app/shop/services/products.service';
import { ShoppingCartService } from 'src/app/cart/services/shopping-cart.service';
import { IProduct } from 'src/app/shop/product';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ProductImageDirective],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  private readonly _productService = inject(ProductsService);
  private readonly _cartService = inject(ShoppingCartService);

  public product: IProduct | undefined = undefined;

  @Input()
  public set id(productId: string) {
    this._productService
      .getProductById(productId)
      .then((product) => {
        this.product = product;
      });
  }

  public addToCart(): void {
    if (this.product) {
      this._cartService.addToCart({
        product_id: this.product.id,
        name: this.product.name,
        img_url: this.product.img_url,
        unit_price: this.product.price,
        quantity: 1,
        ammount: this.product.price
      });
    }
  }
}