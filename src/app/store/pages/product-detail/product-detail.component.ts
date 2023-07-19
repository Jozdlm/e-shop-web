import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct, ProductOption } from '../../interfaces/product';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { WishListService } from 'src/app/wish/services/wish-list.service';
import { ProductsService } from 'src/app/shop/services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ProductImageDirective],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  private readonly _productService = inject(ProductsService);
  private readonly _cartService = inject(ShoppingCartService);
  private readonly _wishService = inject(WishListService);

  public product: IProduct | undefined = undefined;
  public selectedOption = signal<ProductOption | undefined>(undefined);

  @Input()
  public set id(productId: string) {
    this._productService
      .getProductById(productId)
      .subscribe((product) => {
        this.product = product;
        // this.selectedOption.set(product.options[0])
      });
  }

  public addToCart(): void {
    if (this.product) {
      this._cartService.addToCart({
        product_id: this.product.id,
        name: this.product.name,
        img_url: this.product.img_url,
        unit_price: this.product.price
      });
    }
  }

  public addToWish(): void {
    if(this.product) {
      this._wishService.addToWish(this.product);
    }
  }
}
