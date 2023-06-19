import { Component, ElementRef, HostListener, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div
      class="relative"
      (mouseenter)="displayDropdown()"
      (mouseleave)="hideDropdown()"
    >
      <!-- Dropdown Toggle -->
      <button class="rounded px-4 py-2.5" [routerLink]="pageUrl">
        <ng-content select="#toggle-content"></ng-content>
      </button>
      <div
        class="right-0 top-11 w-80 rounded border border-neutral-300 bg-white p-4 drop-shadow-lg"
        [ngClass]="{ absolute: showDropdown, hidden: !showDropdown }"
      >
        <!-- Contenido del Dropdown -->
        <ng-content select="#dropdown-content"></ng-content>
      </div>
    </div>
  `,
  styles: [],
})
export class DropdownComponent {
  public showDropdown: boolean = false;

  @Input()
  public pageUrl: string = '';

  constructor() {}

  public displayDropdown(): void {
    this.showDropdown = true;
  }

  public hideDropdown(): void {
    this.showDropdown = false;
  }
}
