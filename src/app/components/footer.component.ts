import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BUSINESS_NAME } from '@app/constants';
import { Pages } from '@app/pages';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  template: `
    <div class="mt-4 w-full border-t border-neutral-300 px-10 py-7">
      <div
        class="mx-auto flex w-[90%] max-w-[1200px] items-end justify-between px-4"
      >
        <div>
          <a class="block text-lg font-semibold" [routerLink]="pages.HOME">
            {{ businessName }}
          </a>
          <p class="text-sm">
            Variedad de productos para uso escolar, de oficinas, regalos para
            toda ocación y más!
          </p>
        </div>
        <div>
          <div class="flex justify-end gap-x-6">
            <a
              href="https://www.facebook.com/librerialajoya"
              target="_blank"
              rel="noopener"
              class="text-sm font-medium"
              >Facebook</a
            >
            <a
              href="https://www.instagram.com/librerialajoya/"
              target="_blank"
              rel="noopener"
              class="text-sm font-medium"
              >Instagram</a
            >
          </div>
          <p class="text-sm">
            © {{ currentYear }} Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>
  `,
})
export class FooterComponent {
  public currentYear: number = new Date().getFullYear();
  public businessName: string = BUSINESS_NAME;
  public pages = Pages;
}
