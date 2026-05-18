import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoService } from '../../services/producto.service';
import { HuespedService } from '../../services/huesped.service';
import { HabitacionService } from '../../services/habitacion.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {

  totalProductos = 0;
  totalHuespedes = 0;
  totalHabitaciones = 0;

  habitacionesLibres = 0;
  habitacionesOcupadas = 0;

  constructor(
    private productoService: ProductoService,
    private huespedService: HuespedService,
    private habitacionService: HabitacionService
  ) {}

  ngOnInit(): void {

    this.productoService.listar().subscribe({
      next: (data) => this.totalProductos = data.length,
      error: (err) => console.error('Error productos:', err)
    });

    this.huespedService.listar().subscribe({
      next: (data) => this.totalHuespedes = data.length,
      error: (err) => console.error('Error huéspedes:', err)
    });

    this.habitacionService.listar().subscribe({
      next: (data) => {
        this.totalHabitaciones = data.length;

        this.habitacionesLibres = data.filter(h => {
          const estado = h.estado?.trim().toUpperCase();
          return estado === 'LIBRE' || estado === 'DISPONIBLE';
        }).length;

        this.habitacionesOcupadas = data.filter(h => {
          const estado = h.estado?.trim().toUpperCase();
          return estado === 'OCUPADO' || estado === 'OCUPADA';
        }).length;
      },
      error: (err) => console.error('Error habitaciones:', err)
    });
  }
}