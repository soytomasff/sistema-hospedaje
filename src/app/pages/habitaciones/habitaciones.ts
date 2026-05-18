import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitacionService, Habitacion } from '../../services/habitacion.service';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habitaciones.html',
  styleUrl: './habitaciones.css',
})
export class HabitacionesComponent implements OnInit {

  habitaciones: Habitacion[] = [];

  mostrarFormulario = false;
  modoEdicion = false;

  habitacionForm: Habitacion = {
    codigo: '',
    numero: '',
    tipo: '',
    capacidad: 0,
    precio: 0,
    estado: ''
  };

  constructor(private habitacionService: HabitacionService) {}

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  cargarHabitaciones(): void {
    this.habitacionService.listar().subscribe({
      next: (data) => this.habitaciones = data,
      error: (err) => console.error('Error al cargar habitaciones:', err)
    });
  }

  agregar(): void {
    this.modoEdicion = false;
    this.mostrarFormulario = true;

    this.habitacionForm = {
      codigo: '',
      numero: '',
      tipo: '',
      capacidad: 0,
      precio: 0,
      estado: ''
    };
  }

  editar(habitacion: Habitacion): void {
    this.modoEdicion = true;
    this.mostrarFormulario = true;
    this.habitacionForm = { ...habitacion };
  }

  guardar(): void {
    if (this.modoEdicion && this.habitacionForm.id) {
      this.habitacionService.actualizar(this.habitacionForm.id, this.habitacionForm).subscribe({
        next: () => {
          this.cargarHabitaciones();
          this.mostrarFormulario = false;
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.habitacionService.crear(this.habitacionForm).subscribe({
        next: () => {
          this.cargarHabitaciones();
          this.mostrarFormulario = false;
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta habitación?')) {
      this.habitacionService.eliminar(id).subscribe({
        next: () => this.cargarHabitaciones(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
  }
}