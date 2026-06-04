import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReservaService } from '../../services/reserva.service';

import { Reserva } from '../../models/reserva';

@Component({
  selector: 'app-reservas',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './reservas.html',

  styleUrl: './reservas.css',
})

export class ReservasComponent implements OnInit {

  reservas: Reserva[] = [];

  reservaForm: Reserva = {

    huesped: {},
    habitacion: {},

    fechaIngreso: '',

    fechaSalida: '',

    estado: 'RESERVADO'
  };

  mostrarFormulario = false;

  modoEdicion = false;

  constructor(
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {

    this.listar();
  }

  listar(): void {

    this.reservaService.listar().subscribe(data => {

      this.reservas = data;
    });
  }

  agregar(): void {

    this.mostrarFormulario = true;

    this.modoEdicion = false;

    this.reservaForm = {

      huesped: {},
      habitacion: {},

      fechaIngreso: '',

      fechaSalida: '',

      estado: 'RESERVADO'
    };
  }

  guardar(): void {

    if (this.modoEdicion) {

      this.reservaService.editar(this.reservaForm.id!, this.reservaForm)
      .subscribe(() => {

        this.listar();

        this.cancelar();
      });

    } else {

      this.reservaService.guardar(this.reservaForm)
      .subscribe(() => {

        this.listar();

        this.cancelar();
      });
    }
  }

  editar(r: Reserva): void {

    this.reservaForm = { ...r };

    this.modoEdicion = true;

    this.mostrarFormulario = true;
  }

  eliminar(id: number): void {

    this.reservaService.eliminar(id)
    .subscribe(() => {

      this.listar();
    });
  }

  cancelar(): void {

    this.mostrarFormulario = false;
  }
}