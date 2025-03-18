import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer.component';
import { NavbarComponent } from './components/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <app-navbar></app-navbar>

      <div class="mx-auto max-w-[1200px] w-[90%] mb-6">
        <router-outlet></router-outlet>
      </div>

      <app-footer></app-footer>
    </div>
  `,
})
export class AppComponent {}
