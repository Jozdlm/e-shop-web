import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from '@app/components/search-input.component';
import { RouterModule } from '@angular/router';
import { CategoriesService } from '@app/services/categories.service';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, SearchInputComponent, RouterModule],
  template: `
    <div
      class="relative z-10 mb-10 flex h-[400px] w-full items-center overflow-hidden bg-[url('assets/images/banner.png')] from-black bg-cover bg-center bg-no-repeat px-10 before:absolute before:inset-0 before:z-[-5] before:block before:bg-gradient-to-r before:from-slate-950 before:to-transparent before:opacity-80 before:content-['']"
    >
      <div>
        <div class="mb-6">
          <h1 class="mb-2 text-2xl font-medium text-gray-50">
            Bienvenido a nuestra tienda!
          </h1>
          <p class="w-96 text-sm text-gray-50">
            Te invitamos a ver nuestro catalogo de productos o puedes buscar uno
            en específico.
          </p>
        </div>
        <app-search-input />
      </div>
    </div>

    <div>
      <div class="mb-8">
        <div class="grid grid-cols-4 gap-3">
          @for (category of categories$ | async; track category.id) {
            <a
              class="border border-gray-300 px-3 py-2 h-36"
              [routerLink]="['shop', category.slug]"
            >
              <p>{{ category.name }}</p>
            </a>
          }
        </div>
      </div>
    </div>
  `,
})
export class HomePage {
  private _categoriesService: CategoriesService = inject(CategoriesService);
  public categories$ = this._categoriesService.getCategories();
}
