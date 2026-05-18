import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  huespedForm: Huesped = {
    nombre: '',
    apellido: '',
    dni: '',
    procedencia: '',
    pais: '',
    profesion: '',
    telefono: ''
  };

  constructor(private huespedService: HuespedService) {}

  ngOnInit(): void {
    this.cargarHuespedes();
  }

  cargarHuespedes(): void {
    this.huespedService.listar().subscribe({
      next: (data) => this.huespedes = data,
      error: (err) => console.error('Error:', err)
    });
  }

  agregar(): void {
    this.mostrarFormulario = true;
    this.modoEdicion = false;

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
    this.huespedForm = { ...huesped };
  }

  guardar(): void {
    if (this.modoEdicion && this.huespedForm.id) {
      this.huespedService.actualizar(this.huespedForm.id, this.huespedForm).subscribe({
        next: () => {
          this.cargarHuespedes();
          this.cancelar();
        },
        error: (err) => console.error('Error al actualizar:', err)
      });
    } else {
      this.huespedService.crear(this.huespedForm).subscribe({
        next: () => {
          this.cargarHuespedes();
          this.cancelar();
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar este huésped?')) {
      this.huespedService.eliminar(id).subscribe({
        next: () => this.cargarHuespedes(),
        error: (err) => console.error('Error al eliminar:', err)
      });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
  }
}