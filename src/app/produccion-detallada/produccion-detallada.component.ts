import { Component, Input } from '@angular/core';
import { IProduccionDetallada} from '../produccion-detallada';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-produccion-detallada',
  standalone: true,
  imports: [RouterModule],
  template: `
  
   <section class="listing" [routerLink]="['/details', produccionDetallada.id]">
      <img
        class="listing-photo"
        [src]="produccionDetallada.photo"
        alt="{{ produccionDetallada.nombre }}"
      />
      <h2 class="listing-heading">{{ produccionDetallada.nombre }}</h2>
      <h3 class="listing-productos">{{ "$"+produccionDetallada.valor }} </h3>
    </section>
  `,
  styleUrl: './produccion-detallada.component.css'
})
export class ProduccionDetalladaComponent {
  @Input() produccionDetallada!: IProduccionDetallada;
}
