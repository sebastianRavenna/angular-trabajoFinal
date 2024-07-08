import { Component, inject, Input} from '@angular/core';
import { IProduccionDetallada } from '../produccion-detallada';
import { ProduccionService } from '../produccion.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ` 
   <article>
        
   @if(!produccionDetallada){
      <p>Cargando...</p>
      

    }@else { 
    
      
      <img
        class="listing-photo"
        [src]="produccionDetallada.photo"
        [alt]="produccionDetallada.nombre"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ produccionDetallada.nombre }}</h2>
        <p class="listing-productos">
          {{ produccionDetallada.categoria }}, {{ produccionDetallada.tela }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">Detalles</h2>
        <ul>
          <li>
          Especificaciones:{{
            produccionDetallada.especificaciones
          }}
          </li>
          <li>
            Tabla de Talles:{{
              produccionDetallada.talles
            }}
          </li>
          <h3>"$ "+ produccionDetallada.valor </h3>
          <li>Stock disponible: {{ produccionDetallada.stock }}</li>
        </ul>
      </section>
          }
          
      <section class="listing-apply">
        <h2 class="section-heading">Escribinos y un asesor  se comunicará <br>con vos a la brevedad!</h2>
        <form [formGroup]="applyForm" (submit)="handleSubmit()">
          
          <label for="first-name">Nombre</label>
          <input type="text" id="first-name" formControlName="firstName" />
          <span class="alert" [hidden]="firstName.valid || firstName.untouched"
            >Debés poner tu nombre</span>

          <label for="last-name">Apellido</label>
          <input type="text" id="last-name" formControlName="lastName" />
          <span class="alert" [hidden]="lastName.valid || lastName.untouched"
            >Debés poner tu apellido</span>
          
            <label for="email">Email</label>
          <input type="text" id="email" formControlName="email" />
          <span class="alert" [hidden]="email.valid || email.untouched">
            @if(email.errors?.['required']){Debés poner tu mail} @else{Debe ser un email válido}
          </span>
        
          <button type="submit" class="primary" [disabled]="applyForm.invalid">
            Enviar
          </button>
        </form>
      </section>
    </article>


  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  
  route: ActivatedRoute = inject(ActivatedRoute);
  produccionService = inject(ProduccionService);
  produccionDetallada: IProduccionDetallada | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]),
  });
  constructor() {
    const produccionDetalladaId = Number(this.route.snapshot.params['id']);
    this.produccionService
      .getProductosDetalladosById(produccionDetalladaId)
      .then((produccionDetallada) => {
        this.produccionDetallada = produccionDetallada;
      });
  }
  get firstName() {
    return this.applyForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.applyForm.get('lastName') as FormControl;
  }
  get email() {
    return this.applyForm.get('email') as FormControl;
  }

  handleSubmit() {
    if (this.applyForm.invalid) return;
    this.produccionService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
  
}
