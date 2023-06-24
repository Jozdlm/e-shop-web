import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
})
export class AppComponent {
  private _http = inject(HttpClient);

  public businessName: string = '';

  constructor() {
    this._http
      .get<IBusiness>('http://localhost:3000/business')
      .subscribe((business) => {
        this.businessName = business.name;
      });
  }
}

interface IBusiness {
  name: string;
}
