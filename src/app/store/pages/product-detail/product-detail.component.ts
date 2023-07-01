import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct, ProductOption } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { ButtonComponent } from 'src/app/common/components/button/button.component';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ProductImageDirective } from 'src/app/common/directives/product-image.directive';
import { WishListService } from 'src/app/shop/services/wish-list.service';

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
  public set id(productId: number) {
    this._productService
      .getProductById(productId)
      .subscribe((product) => (this.product = product));
  }

  public chooseOption(option: ProductOption): void {
    if (this.selectedOption()?.type == option.type) {
      this.selectedOption.set(undefined);
    } else {
      this.selectedOption.set(option);
    }
  }

  public addToCart(): void {
    if (this.product && this.selectedOption()) {
      this._cartService.addToCart(this.product, this.selectedOption());
    }
  }

  public addToWish(): void {
    if(this.product && this.selectedOption()) {
      this._wishService.addToWish(this.product);
    }
  }
}
