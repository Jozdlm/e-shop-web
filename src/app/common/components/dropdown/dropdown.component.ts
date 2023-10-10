import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="relative">
      <!-- Dropdown Toggle -->
      <button class="rounded p-2" [routerLink]="pageUrl">
        <ng-content select="#toggle-content"></ng-content>
      </button>
      <div
        class="right-0 top-10 z-20 rounded border border-neutral-300 bg-white drop-shadow-lg"
        [class.absolute]="showDropdown"
        [class.hidden]="!showDropdown"
        [ngClass]="{
          'w-52 py-1': isMenu,
          'w-80 p-4': !isMenu
        }"
      >
        <!-- Dropdown Body -->
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

  @HostListener('mouseenter')
  public displayDropdown(): void {
    this.showDropdown = true;
  }

  @HostListener('mouseleave')
  public hideDropdown(): void {
    this.showDropdown = false;
  }
}
