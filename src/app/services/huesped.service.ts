import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Huesped {
  id?: number;

  nombre: string;
  apellido: string;

  dni: string;

  procedencia: string;
  pais: string;

  profesion: string;

  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class HuespedService {

  private apiUrl = 'http://localhost:8080/api/huespedes';

  constructor(private http: HttpClient) {}

  // LISTAR
  listar(): Observable<Huesped[]> {
    return this.http.get<Huesped[]>(this.apiUrl);
  }

  // BUSCAR POR DNI
  buscarPorDni(dni: string): Observable<Huesped> {
    return this.http.get<Huesped>(`${this.apiUrl}/dni/${dni}`);
  }

  // AGREGAR
  crear(huesped: Huesped): Observable<Huesped> {
    return this.http.post<Huesped>(this.apiUrl, huesped);
  }

  // EDITAR
  actualizar(id: number, huesped: Huesped): Observable<Huesped> {
    return this.http.put<Huesped>(`${this.apiUrl}/${id}`, huesped);
  }

  // ELIMINAR
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}