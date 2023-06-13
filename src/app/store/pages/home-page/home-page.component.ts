import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../interfaces/product";
import {ProductsService} from "../../services/products.service";
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
    standalone: true,
    imports: [NgFor, ProductCardComponent]
})
export class HomePageComponent implements OnInit {
  public products: IProduct[] = [];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}

