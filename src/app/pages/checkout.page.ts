import { Component } from '@angular/core';

@Component({
  imports: [],
  styles: [
    `
      .wrapper {
        display: grid;
        grid-template-columns: 1fr 394px;
      }
    `,
  ],
  template: `
    <div class="wrapper pt-6">
      <div>
        <p class="text-lg font-medium">Articulos</p>
      </div>
      <div>
        <p class="mb-6 text-lg font-medium">Datos de entrega</p>
        <form action="" autocomplete="off">
          <div class="mb-6 grid">
            <label for="email" class="mb-1.5 text-sm font-medium">Correo</label>
            <input
              type="email"
              id="email"
              name="email"
              class="rounded-lg border border-gray-300 px-2 py-2.5 text-sm"
            />
          </div>
          <div class="mb-6 grid">
            <label for="phone" class="mb-1.5 text-sm font-medium"
              >Celular</label
            >
            <input
              type="text"
              id="phone"
              name="phone"
              class="rounded-lg border border-gray-300 px-2 py-2.5 text-sm"
            />
          </div>
          <div class="mb-6 grid">
            <label for="collector" class="mb-1.5 text-sm font-medium"
              >Persona que recoge</label
            >
            <input
              type="text"
              id="collector"
              name="collector"
              class="rounded-lg border border-gray-300 px-2 py-2.5 text-sm"
              placeholder="Nombre"
            />
          </div>
        </form>
      </div>
    </div>
  `,
})
export class CheckoutPage {}
