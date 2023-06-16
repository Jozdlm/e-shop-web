import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="py-2.5 px-4 rounded border border-gray-300 hover:bg-green-500/10 hover:border-green-800"
    >
      <span class="text-sm font-semibold text-green-800">
        <ng-content></ng-content>
      </span>
    </button>
  `,
})
export class ButtonComponent {}
