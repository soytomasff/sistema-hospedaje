import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Registro } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl = 'http://localhost:8080/api/registros';

  constructor(private http: HttpClient) {}

  listar(): Observable<Registro[]> {
    return this.http.get<Registro[]>(this.apiUrl);
  }

  guardar(registro: Registro): Observable<Registro> {
    return this.http.post<Registro>(this.apiUrl, registro);
  }

  actualizar(id: number, registro: Registro): Observable<Registro> {
    return this.http.put<Registro>(`${this.apiUrl}/${id}`, registro);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}