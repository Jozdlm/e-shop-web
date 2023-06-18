import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ProductImageDirective],
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent {
  private readonly _productService = inject(ProductsService);
  private readonly _cartService = inject(ShoppingCartService);

  public product: IProduct | undefined = undefined;

  @Input()
  public set id(productId: number) {
    this._productService.getProductById(productId)
      .subscribe(product => this.product = product);
  };

  public addToCart(): void {
    if(this.product) {
      this._cartService.addToCart(this.product);
    }
  }
}
