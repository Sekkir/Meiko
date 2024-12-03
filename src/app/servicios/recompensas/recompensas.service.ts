import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecompensasService {

  private apiUrl = 'https://bemeiko-production.up.railway.app/api/recompensa'; // Cambia esta URL si es necesario

  constructor(private http: HttpClient) {}

  crearRecompensa(data: any): Observable<any> {
    return this.http.post(this.apiUrl,"/crear", data);
  }

  getRecompensasByCurso(id_curso: number): Observable<any> {
    return this.http.get(`${this.apiUrl}s/${id_curso}`);  // Ajusta la URL para obtener las recompensas por curso
  }
}
