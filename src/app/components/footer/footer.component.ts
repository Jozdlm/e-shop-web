import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BUSINESS_NAME } from '@app/constants';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  public currentYear: number = new Date().getFullYear();
  public businessName: string = BUSINESS_NAME;
}
