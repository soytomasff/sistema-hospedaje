import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { HuespedService, Huesped } from '../../services/huesped.service';

@Component({
  selector: 'app-huespedes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './huespedes.html',
  styleUrl: './huespedes.css',
})
export class HuespedesComponent implements OnInit {

  huespedes: Huesped[] = [];

  mostrarFormulario = false;
  modoEdicion = false;

  dniBusqueda = '';
  huespedEncontrado = false;
  dniNoEncontrado = false;

  huespedForm: Huesped = {
    nombre: '',
    apellido: '',
    dni: '',
    procedencia: '',
    pais: '',
    profesion: '',
    telefono: ''
  };

  constructor(
    private huespedService: HuespedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarHuespedes();
  }

  cargarHuespedes(): void {
    this.huespedService.listar().subscribe({
      next: (data) => {
        this.huespedes = data;
      },
      error: (err) => {
        console.error('Error al cargar huéspedes:', err);
      }
    });
  }

  buscarPorDni(): void {
    const dni = this.dniBusqueda.trim();

    if (!dni) {
      alert('Ingrese un DNI para buscar');
      return;
    }

    this.huespedService.buscarPorDni(dni).subscribe({
      next: (data) => {
        this.huespedForm = {
          id: data.id,
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          dni: data.dni || '',
          procedencia: data.procedencia || '',
          pais: data.pais || '',
          profesion: data.profesion || '',
          telefono: data.telefono || ''
        };

        this.mostrarFormulario = true;
        this.modoEdicion = true;

        this.huespedEncontrado = true;
        this.dniNoEncontrado = false;

        alert('Huésped encontrado. Sus datos se cargaron automáticamente.');
      },
      error: () => {
        this.huespedForm = {
          nombre: '',
          apellido: '',
          dni: dni,
          procedencia: '',
          pais: '',
          profesion: '',
          telefono: ''
        };

        this.mostrarFormulario = true;
        this.modoEdicion = false;

        this.huespedEncontrado = false;
        this.dniNoEncontrado = true;

        alert('Huésped no encontrado. Complete el formulario para registrarlo.');
      }
    });
  }

  agregar(): void {
    this.mostrarFormulario = true;
    this.modoEdicion = false;

    this.huespedEncontrado = false;
    this.dniNoEncontrado = false;
    this.dniBusqueda = '';

    this.huespedForm = {
      nombre: '',
      apellido: '',
      dni: '',
      procedencia: '',
      pais: '',
      profesion: '',
      telefono: ''
    };
  }

  editar(huesped: Huesped): void {
    this.mostrarFormulario = true;
    this.modoEdicion = true;

    this.huespedEncontrado = true;
    this.dniNoEncontrado = false;
    this.dniBusqueda = huesped.dni;

    this.huespedForm = { ...huesped };
  }

  guardar(): void {
    if (!this.huespedForm.nombre.trim()) {
      alert('Ingrese el nombre');
      return;
    }

    if (!this.huespedForm.apellido.trim()) {
      alert('Ingrese el apellido');
      return;
    }

    if (!this.huespedForm.dni.trim()) {
      alert('Ingrese el DNI');
      return;
    }

    if (this.modoEdicion && this.huespedForm.id) {
      this.huespedService.actualizar(this.huespedForm.id, this.huespedForm).subscribe({
        next: () => {
          alert('Huésped actualizado correctamente');
          this.cargarHuespedes();
          this.cancelar();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar huésped');
        }
      });
    } else {
      this.huespedService.crear(this.huespedForm).subscribe({
        next: () => {
          alert('Huésped registrado correctamente');
          this.cargarHuespedes();
          this.cancelar();
        },
        error: (err) => {
          console.error('Error al crear:', err);
          alert('Error al registrar huésped. Verifique si el DNI ya existe.');
        }
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este huésped?')) {
      this.huespedService.eliminar(id).subscribe({
        next: () => {
          alert('Huésped eliminado correctamente');
          this.cargarHuespedes();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar huésped');
        }
      });
    }
  }

  irARegistrarEstancia(): void {
    this.router.navigate(['/registros']);
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.modoEdicion = false;

    this.huespedEncontrado = false;
    this.dniNoEncontrado = false;
    this.dniBusqueda = '';

    this.huespedForm = {
      nombre: '',
      apellido: '',
      dni: '',
      procedencia: '',
      pais: '',
      profesion: '',
      telefono: ''
    };
  }
}