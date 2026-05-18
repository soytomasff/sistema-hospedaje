import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegistroService } from '../../services/registro.service';
import { HuespedService, Huesped } from '../../services/huesped.service';
import { HabitacionService, Habitacion } from '../../services/habitacion.service';

import { Registro } from '../../models/registro';

@Component({
  selector: 'app-registros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registros.html',
  styleUrl: './registros.css'
})
export class RegistrosComponent implements OnInit {

  registros: Registro[] = [];
  huespedes: Huesped[] = [];
  habitaciones: Habitacion[] = [];

  editando = false;

  registro: Registro = {
    huespedId: 0,
    habitacionId: 0,
    fechaIngreso: '',
    horaIngreso: '',
    fechaSalida: '',
    horaSalida: '',
    precio: 0
  };

  constructor(
    private registroService: RegistroService,
    private huespedService: HuespedService,
    private habitacionService: HabitacionService
  ) {}

  ngOnInit(): void {
    this.listar();
    this.cargarHuespedes();
    this.cargarHabitaciones();
  }

  listar(): void {
    this.registroService.listar().subscribe({
      next: (data) => this.registros = data,
      error: (err) => console.error('Error al listar registros:', err)
    });
  }

  cargarHuespedes(): void {
    this.huespedService.listar().subscribe({
      next: (data) => this.huespedes = data,
      error: (err) => console.error('Error al listar huéspedes:', err)
    });
  }

  cargarHabitaciones(): void {
    this.habitacionService.listar().subscribe({
      next: (data) => this.habitaciones = data,
      error: (err) => console.error('Error al listar habitaciones:', err)
    });
  }

  seleccionarHabitacion(): void {

    const habitacion = this.habitaciones.find(
      h => h.id === this.registro.habitacionId
    );

    if (habitacion) {
      this.registro.precio = habitacion.precio;
    }
  }

  guardar(): void {

    if (this.editando && this.registro.id) {

      this.registroService.actualizar(
        this.registro.id,
        this.registro
      ).subscribe({

        next: () => {
          this.listar();
          this.limpiar();
        },

        error: (err) =>
          console.error('Error al actualizar:', err)
      });

    } else {

      this.registroService.guardar(this.registro).subscribe({

        next: () => {
          this.listar();
          this.limpiar();
        },

        error: (err) =>
          console.error('Error al guardar:', err)
      });
    }
  }

  editar(registro: Registro): void {
    this.editando = true;
    this.registro = { ...registro };
  }

  eliminar(id: number): void {

    if (confirm('¿Eliminar registro?')) {

      this.registroService.eliminar(id).subscribe({

        next: () => this.listar(),

        error: (err) =>
          console.error('Error al eliminar:', err)
      });
    }
  }

  limpiar(): void {

    this.editando = false;

    this.registro = {
      huespedId: 0,
      habitacionId: 0,
      fechaIngreso: '',
      horaIngreso: '',
      fechaSalida: '',
      horaSalida: '',
      precio: 0
    };
  }

  obtenerNombreHuesped(id: number): string {

    const huesped = this.huespedes.find(
      h => h.id === id
    );

    return huesped
      ? `${huesped.nombre} ${huesped.apellido}`
      : 'No encontrado';
  }

  obtenerHabitacion(id: number): string {

    const habitacion = this.habitaciones.find(
      h => h.id === id
    );

    return habitacion
      ? `${habitacion.codigo} - ${habitacion.numero}`
      : 'No encontrada';
  }
}