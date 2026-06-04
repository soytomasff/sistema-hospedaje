import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoInventarioService {

  private apiUrl = 'http://localhost:8080/api/movimientos';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  guardar(movimiento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movimiento);
  }
}