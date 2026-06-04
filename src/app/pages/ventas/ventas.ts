import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductoService } from '../../services/producto.service';
import { VentaProductoService } from '../../services/venta-producto.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css'
})
export class Ventas implements OnInit {

  productos: any[] = [];
  ventas: any[] = [];

  venta = {
    producto: {
      id: 0
    },
    cantidad: 1,
    metodoPago: 'EFECTIVO',
    observacion: ''
  };

  constructor(
    private productoService: ProductoService,
    private ventaService: VentaProductoService
  ) {}

  ngOnInit(): void {
    this.listarProductos();
    this.listarVentas();
  }

  listarProductos(): void {
    this.productoService.listar().subscribe({
      next: (data) => {
        this.productos = data.filter((p: any) => p.codigo?.startsWith('PROD-'));
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  listarVentas(): void {
    this.ventaService.listar().subscribe({
      next: (data) => {
        this.ventas = data;
      },
      error: (err) => {
        console.error('Error al cargar ventas:', err);
      }
    });
  }

  productoSeleccionado(): any {
    return this.productos.find(p => p.id === Number(this.venta.producto.id));
  }

  calcularSubtotal(): number {
    const producto = this.productoSeleccionado();

    if (!producto) {
      return 0;
    }

    return producto.precio * this.venta.cantidad;
  }

  registrarVenta(): void {
    if (this.venta.producto.id === 0) {
      alert('Seleccione un producto');
      return;
    }

    if (this.venta.cantidad <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    const producto = this.productoSeleccionado();

    if (!producto) {
      alert('Producto no válido');
      return;
    }

    if (producto.stock < this.venta.cantidad) {
      alert('Stock insuficiente');
      return;
    }

    this.ventaService.guardar(this.venta).subscribe({
      next: () => {
        alert('Venta registrada correctamente');

        this.venta = {
          producto: {
            id: 0
          },
          cantidad: 1,
          metodoPago: 'EFECTIVO',
          observacion: ''
        };

        this.listarProductos();
        this.listarVentas();
      },
      error: (err) => {
        console.error('Error al registrar venta:', err);
        alert(err.error?.message || 'Error al registrar venta');
      }
    });
  }
}