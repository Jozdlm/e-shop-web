import { Component } from '@angular/core';


@Component({
    selector: 'ui-search-icon',
    imports: [],
    template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-5 w-5 text-neutral-500 hover:text-neutral-700"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  `,
    styles: ``
})
export class SearchIconComponent {}
