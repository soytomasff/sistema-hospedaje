import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  dniBusqueda = '';
  huespedEncontrado: Huesped | null = null;
  dniNoEncontrado = false;

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
    private habitacionService: HabitacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listar();
    this.cargarHuespedes();
    this.cargarHabitaciones();
  }

  listar(): void {
    this.registroService.listar().subscribe({
      next: (data) => {
        this.registros = data;
      },
      error: (err) => {
        console.error('Error al listar registros:', err);
      }
    });
  }

  cargarHuespedes(): void {
    this.huespedService.listar().subscribe({
      next: (data) => {
        this.huespedes = data;
      },
      error: (err) => {
        console.error('Error al listar huéspedes:', err);
      }
    });
  }

  cargarHabitaciones(): void {
    this.habitacionService.listar().subscribe({
      next: (data) => {
        this.habitaciones = data;
      },
      error: (err) => {
        console.error('Error al listar habitaciones:', err);
      }
    });
  }

  buscarHuespedPorDni(): void {
    const dni = this.dniBusqueda.trim();

    if (!dni) {
      alert('Ingrese el DNI para buscar');
      return;
    }

    this.huespedService.buscarPorDni(dni).subscribe({
      next: (huesped) => {
        this.huespedEncontrado = huesped;
        this.dniNoEncontrado = false;

        this.registro.huespedId = huesped.id || 0;

        const existe = this.huespedes.some(h => h.id === huesped.id);

        if (!existe) {
          this.huespedes.push(huesped);
        }

        alert('Huésped encontrado. Ahora seleccione habitación y registre la estancia.');
      },
      error: () => {
        this.huespedEncontrado = null;
        this.dniNoEncontrado = true;
        this.registro.huespedId = 0;

        alert('No se encontró huésped con ese DNI. Primero debe registrarlo en Huéspedes.');
      }
    });
  }

  irARegistrarHuesped(): void {
    this.router.navigate(['/huespedes']);
  }

  seleccionarHabitacion(): void {
    const habitacion = this.habitaciones.find(
      h => h.id === this.registro.habitacionId
    );

    if (habitacion) {
      this.registro.precio = Number(habitacion.precio || 0);
    }
  }

  guardar(): void {
    if (!this.registro.huespedId || this.registro.huespedId === 0) {
      alert('Primero busque o seleccione un huésped');
      return;
    }

    if (!this.registro.habitacionId || this.registro.habitacionId === 0) {
      alert('Seleccione una habitación');
      return;
    }

    if (!this.registro.precio || this.registro.precio <= 0) {
      alert('Ingrese un precio válido');
      return;
    }

    if (!this.registro.fechaIngreso) {
      alert('Ingrese fecha de ingreso');
      return;
    }

    if (!this.registro.horaIngreso) {
      alert('Ingrese hora de ingreso');
      return;
    }

    if (this.editando && this.registro.id) {

      this.registroService.actualizar(
        this.registro.id,
        this.registro
      ).subscribe({
        next: () => {
          alert('Registro actualizado correctamente');
          this.listar();
          this.limpiar();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar registro');
        }
      });

    } else {

      this.registroService.guardar(this.registro).subscribe({
        next: () => {
          alert('Estancia registrada correctamente');
          this.listar();
          this.limpiar();
        },
        error: (err) => {
          console.error('Error al guardar:', err);
          alert('Error al guardar registro');
        }
      });

    }
  }

  editar(registro: Registro): void {
    this.editando = true;
    this.registro = { ...registro };

    const huesped = this.huespedes.find(
      h => h.id === registro.huespedId
    );

    if (huesped) {
      this.dniBusqueda = huesped.dni;
      this.huespedEncontrado = huesped;
      this.dniNoEncontrado = false;
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Eliminar registro?')) {
      this.registroService.eliminar(id).subscribe({
        next: () => {
          alert('Registro eliminado correctamente');
          this.listar();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar registro');
        }
      });
    }
  }

  limpiar(): void {
    this.editando = false;
    this.dniBusqueda = '';
    this.huespedEncontrado = null;
    this.dniNoEncontrado = false;

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