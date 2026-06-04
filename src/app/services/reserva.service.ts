import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root',
})

export class ReservaService {

  private apiUrl = 'http://localhost:8080/reservas';

  constructor(
    private http: HttpClient
  ) {}

  // LISTAR
  listar(): Observable<Reserva[]> {

    return this.http.get<Reserva[]>(this.apiUrl);
  }

  // GUARDAR
  guardar(reserva: Reserva): Observable<Reserva> {

    return this.http.post<Reserva>(
      this.apiUrl,
      reserva
    );
  }

  // EDITAR
  editar(
    id: number,
    reserva: Reserva
  ): Observable<Reserva> {

    return this.http.put<Reserva>(
      `${this.apiUrl}/${id}`,
      reserva
    );
  }

  // ELIMINAR
  eliminar(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}