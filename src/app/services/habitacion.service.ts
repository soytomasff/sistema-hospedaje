import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Habitacion {
  id?: number;
  codigo: string;
  numero: string;
  tipo: string;
  capacidad: number;
  precio: number;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private apiUrl = 'http://localhost:8080/api/habitaciones';

  constructor(private http: HttpClient) {}

  listar(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.apiUrl);
  }

  crear(habitacion: Habitacion): Observable<Habitacion> {
    return this.http.post<Habitacion>(this.apiUrl, habitacion);
  }

  actualizar(id: number, habitacion: Habitacion): Observable<Habitacion> {
    return this.http.put<Habitacion>(`${this.apiUrl}/${id}`, habitacion);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}