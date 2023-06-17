import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { ButtonComponent } from 'src/app/common/components/button/button.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  private readonly _productService = inject(ProductsService);

  public product: IProduct | undefined = undefined;
  public quantity = signal<number>(1);

  @Input()
  public set id(productId: number) {
    this._productService.getProductById(productId)
      .subscribe(product => this.product = product);
  };

  constructor() {}

  public increaseQty(): void {
    this.quantity.update(value => value + 1);
  }

  public decreaseQty(): void {
    this.quantity.update(value => 
      (this.quantity() == 1) ? 1 : value - 1  
    );
  }
}
