import { Injectable } from '@angular/core';
import { IProduccionDetallada } from './produccion-detallada';

@Injectable({
  providedIn: 'root'
})
export class ProduccionService {
  
  url = 'http://localhost:3000/productos';
  
  constructor() {}

  async getAllProductosDetallados(): Promise<IProduccionDetallada[]> {
    const data = await fetch(this.url);
    const producto = (await data.json()) ?? [];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(producto);
      }, 300);
      console.log("data y producto" + data, producto)
    });
  }

  async getProductosDetalladosById(id: Number): Promise<IProduccionDetallada> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  
  async submitApplication(firstName: string, lastName: string, email: string) {
    alert(JSON.stringify({ firstName, lastName, email }));
  }
}


