import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../interfaces/product";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
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

