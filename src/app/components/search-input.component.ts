import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-search-input',
  imports: [SvgIconComponent],
  template: `
    <div class="flex items-center gap-x-2 rounded-xl bg-white px-2 py-2.5">
      <svg-icon src="assets/svg/search.svg" class="icon-md" />
      <input
        type="text"
        name="search_product"
        id="search-product"
        class="w-full bg-transparent text-sm outline-none placeholder:text-slate-600"
        placeholder="Busca cualquier producto :)"
        autocomplete="off"
      />
    </div>
  `,
})
export class SearchInputComponent {}
