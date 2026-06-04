import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductoService } from '../../services/producto.service';
import { MovimientoInventarioService } from '../../services/movimiento-inventario.service';

@Component({
  selector: 'app-movimientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movimientos.html',
  styleUrl: './movimientos.css',
})
export class Movimientos implements OnInit {

  productos: any[] = [];
  movimientos: any[] = [];

  movimiento = {
    producto: {
      id: 0
    },
    tipoMovimiento: 'ENTRADA',
    cantidad: 1,
    observacion: ''
  };

  constructor(
    private productoService: ProductoService,
    private movimientoService: MovimientoInventarioService
  ) {}

  ngOnInit(): void {
    this.listarProductos();
    this.listarMovimientos();
  }

  listarProductos(): void {
    this.productoService.listar().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  listarMovimientos(): void {
    this.movimientoService.listar().subscribe({
      next: (data) => {
        this.movimientos = data;
      },
      error: (err) => {
        console.error('Error al cargar movimientos:', err);
      }
    });
  }

  registrarMovimiento(): void {
    if (this.movimiento.producto.id === 0) {
      alert('Seleccione un producto');
      return;
    }

    if (this.movimiento.cantidad <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    this.movimientoService.guardar(this.movimiento).subscribe({
      next: () => {
        alert('Movimiento registrado correctamente');

        this.movimiento = {
          producto: {
            id: 0
          },
          tipoMovimiento: 'ENTRADA',
          cantidad: 1,
          observacion: ''
        };

        this.listarProductos();
        this.listarMovimientos();
      },
      error: (err) => {
        console.error('Error al registrar movimiento:', err);
        alert(err.error?.message || 'Error al registrar movimiento');
      }
    });
  }

  mostrarTipo(tipo: string): string {
    if (tipo === 'DANADO') {
      return 'DAÑADO';
    }

    return tipo;
  }
}