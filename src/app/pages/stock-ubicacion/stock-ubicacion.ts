import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockUbicacionService } from '../../services/stock-ubicacion.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-stock-ubicacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-ubicacion.html',
  styleUrl: './stock-ubicacion.css'
})
export class StockUbicacion implements OnInit {

  inventario: any[] = [];
  productos: any[] = [];

  cargando = false;
  mostrarFormulario = false;
  editando = false;

  stockForm = {
    productoId: 0,
    almacenPrincipal: 0,
    administracion: 0,
    habitaciones: 0,
    recepcion: 0
  };

  constructor(
    private stockService: StockUbicacionService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.listarInventario();
    this.listarProductos();
  }

  listarInventario(): void {
    this.cargando = true;

    this.stockService.listar().subscribe({
      next: (data) => {
        this.inventario = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar inventario por ubicación:', err);
        this.cargando = false;
      }
    });
  }

  listarProductos(): void {
    this.productoService.listar().subscribe({
      next: (data) => {
        this.productos = data.filter((p: any) => p.codigo?.startsWith('INV-'));
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  nuevo(): void {
    this.mostrarFormulario = true;
    this.editando = false;

    this.stockForm = {
      productoId: 0,
      almacenPrincipal: 0,
      administracion: 0,
      habitaciones: 0,
      recepcion: 0
    };
  }

  editar(item: any): void {
    this.mostrarFormulario = true;
    this.editando = true;

    this.stockForm = {
      productoId: item.producto_id,
      almacenPrincipal: item.almacen_principal,
      administracion: item.administracion,
      habitaciones: item.habitaciones,
      recepcion: item.recepcion
    };
  }

  guardar(): void {
    if (this.stockForm.productoId === 0) {
      alert('Seleccione un producto');
      return;
    }

    this.stockService.guardar(this.stockForm).subscribe({
      next: () => {
        alert(this.editando ? 'Stock actualizado correctamente' : 'Stock agregado correctamente');
        this.cancelar();
        this.listarInventario();
      },
      error: (err) => {
        console.error('Error al guardar stock:', err);
        alert('Error al guardar stock');
      }
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;

    this.stockForm = {
      productoId: 0,
      almacenPrincipal: 0,
      administracion: 0,
      habitaciones: 0,
      recepcion: 0
    };
  }
}