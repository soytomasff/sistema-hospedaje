export interface Producto {
  id?: number;
  codigo: string;
  nombre: string;
  categoria: string;
  stock: number;
  stockMinimo: number;
  precio: number;
  descripcion: string;
  unidad: string;
  estado: string;
  ubicacion: string;
}