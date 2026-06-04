import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductoService } from '../../services/producto.service';
import { MovimientoInventarioService } from '../../services/movimiento-inventario.service';

import { Producto } from '../../models/producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];
  movimientos: any[] = [];

  cargando = true;
  editando = false;

  producto: Producto = {
    codigo: '',
    nombre: '',
    categoria: '',
    stock: 0,
    stockMinimo: 0,
    precio: 0,
    descripcion: '',
    unidad: '',
    estado: '',
    ubicacion: ''
  };

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
    this.cargando = true;

    this.productoService.listar().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.cargando = false;
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

  guardarProducto(): void {
    if (this.editando && this.producto.id) {
      this.productoService.actualizar(this.producto.id, this.producto).subscribe({
        next: () => {
          console.log('Producto actualizado correctamente');
          this.listarProductos();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
        }
      });
    } else {
      this.productoService.guardar(this.producto).subscribe({
        next: () => {
          console.log('Producto guardado correctamente');
          this.listarProductos();
          this.limpiarFormulario();
        },
        error: (err) => {
          console.error('Error al guardar:', err);
        }
      });
    }
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

  editarProducto(producto: Producto): void {
    console.log('Producto a editar:', producto);
    this.producto = { ...producto };
    this.editando = true;
  }

  eliminarProducto(id: number | undefined): void {
    console.log('ID a eliminar:', id);

    if (id === undefined || id === null) {
      console.error('No se puede eliminar: ID no válido');
      return;
    }

    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productoService.eliminar(id).subscribe({
        next: () => {
          console.log('Producto eliminado correctamente');
          this.listarProductos();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
        }
      });
    }
  }

  limpiarFormulario(): void {
    this.producto = {
      codigo: '',
      nombre: '',
      categoria: '',
      stock: 0,
      stockMinimo: 0,
      precio: 0,
      descripcion: '',
      unidad: '',
      estado: '',
      ubicacion: ''
    };

    this.editando = false;
  }
}