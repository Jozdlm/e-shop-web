import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shop/components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
})
export class AppComponent {
  constructor() {}
}
