import { Component, DestroyRef, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { ProductsService } from 'src/app/shop/services/products.service';
import { IProduct } from 'src/app/shop/product';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ProductImageDirective,
    ProductCardComponent,
  ],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  private readonly _productService = inject(ProductsService);
  private readonly _cartService = inject(CartService);

  public subscriptions: Subscription = new Subscription();
  public product: IProduct | undefined = undefined;
  public relatedProducts: IProduct[] = [];

  public constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.subscriptions.unsubscribe();
    });
  }

  @Input()
  public set id(productId: string) {
    this._productService.getProductById(productId).then((product) => {
      this.product = product;
    });

    this.subscriptions.add(
      this._productService.getRelatedProducts().subscribe((arr) => {
        this.relatedProducts = arr;
      })
    );
  }

  public addToCart(): void {
    if (this.product) {
      this._cartService.addItemToCart({
        product_id: this.product.id,
        name: this.product.name,
        img_url: this.product.img_url,
        unit_price: this.product.price,
        quantity: 1,
        ammount: this.product.price,
      });
    }
  }
}
