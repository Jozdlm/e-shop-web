import { Component, Input } from '@angular/core';
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
      <button class="rounded p-2" [routerLink]="pageUrl">
        <ng-content select="#toggle-content"></ng-content>
      </button>
      <div
        class="right-0 top-10 rounded border border-neutral-300 bg-white drop-shadow-lg z-20"
        [ngClass]="{
          absolute: showDropdown,
          hidden: !showDropdown,
          'w-52 py-1': isMenu,
          'w-80 p-4': !isMenu
        }"
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

  @Input()
  public isMenu: boolean = false;

  constructor() {}

  public displayDropdown(): void {
    this.showDropdown = true;
  }

  public hideDropdown(): void {
    this.showDropdown = false;
  }
}
