import { Component, inject } from '@angular/core';
import { ProduccionDetalladaComponent } from '../produccion-detallada/produccion-detallada.component';
import { IProduccionDetallada } from '../produccion-detallada';
import { ProduccionService } from '../produccion.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProduccionDetalladaComponent],
  template: `
  
    <section>
      <form>
        <input type="search" placeholder="Filtro por Prenda" #filter />
        <button
          type="button"
          class="primary"
          (click)="filterResults(filter.value)"
        >
          Buscar
        </button>
      </form>
    </section>
    <section class="results">
      @if(!ProduccionDetalladaList.length){
      <span>Cargando...</span>
      } @for(producto of filteredProduccionList; track producto.id ){
      <app-produccion-detallada [produccionDetallada]="producto" />
      }
    </section>
  `,
  styleUrl: './home.component.css',
})
export class HomeComponent {
  ProduccionDetalladaList: IProduccionDetallada[] = [];
  produccionService: ProduccionService = inject(ProduccionService);
  filteredProduccionList: IProduccionDetallada[] = [];
  constructor() {
    this.produccionService
      .getAllProductosDetallados()
      .then((ProduccionDetalladaList: IProduccionDetallada[]) => {
        this.ProduccionDetalladaList = ProduccionDetalladaList;
        this.filteredProduccionList = ProduccionDetalladaList;
      });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredProduccionList = this.ProduccionDetalladaList;
    }
    this.filteredProduccionList = this.ProduccionDetalladaList.filter((producto) =>
      producto?.categoria.toLowerCase().includes(text.toLowerCase())
    );
  }
}

