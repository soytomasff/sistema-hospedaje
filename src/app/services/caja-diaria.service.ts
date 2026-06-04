import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CajaDiariaService {

  private apiUrl = 'http://localhost:8080/api/caja-diaria';

  constructor(private http: HttpClient) {}

  obtenerCaja(fecha: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?fecha=${fecha}`);
  }

  registrarEgreso(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/egresos`, data);
  }

  cerrarCaja(fecha: string, usuario: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/cerrar?fecha=${fecha}&usuario=${usuario}`,
      {}
    );
  }
}