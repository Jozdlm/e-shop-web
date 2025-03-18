import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  imports: [RouterModule],
  selector: 'app-404-page',
  template: `
    <h1>Page not found</h1>
    <p>Please review if you spell correctly the page url</p>
    <a routerLink="">Regresar a la tienda</a>
  `,
})
export class NotFoundPage {}
