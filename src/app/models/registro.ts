export interface Registro {
  id?: number;

  huespedId: number;
  habitacionId: number;

  fechaIngreso: string;
  horaIngreso: string;

  fechaSalida: string;
  horaSalida: string;

  precio: number;
}