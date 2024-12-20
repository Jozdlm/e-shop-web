import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ui-plus-icon',
    imports: [CommonModule],
    template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="h-4 w-4"
    >
      <path
        d="M10.75 6.75a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
      />
    </svg>
  `,
    styles: ``
})
export class PlusIconComponent {}
