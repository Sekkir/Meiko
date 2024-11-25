import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeccionesService {
  private apiUrl = 'http://localhost:3000';  // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener las secciones por ID de docente
  getSeccionesByDocente(id_docente: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/section/secciones/${id_docente}`);
  }
}
