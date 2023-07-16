import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduct } from 'src/app/store/interfaces/product';
import { ProductsService } from 'src/app/store/services/products.service';
import { ProductCardComponent } from 'src/app/store/components/product-card/product-card.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
})
export class HomePageComponent implements OnInit {
  public products: IProduct[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
