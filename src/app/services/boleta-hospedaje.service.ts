import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoletaHospedajeService {

  private apiUrl = 'http://localhost:8080/api/boletas';

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  generar(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}