import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
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

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.listarProductos();
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