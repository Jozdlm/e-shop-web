import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  private readonly _productService = inject(ProductsService);

  public product: IProduct | undefined = undefined;

  @Input()
  public set id(productId: number) {
    this._productService.getProductById(productId)
      .subscribe(product => this.product = product);
  };
}
