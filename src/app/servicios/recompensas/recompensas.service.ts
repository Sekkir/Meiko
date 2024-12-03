import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecompensasService {

  private apiUrl = 'https://bemeiko-production.up.railway.app/api/recompensa/crear'; // Cambia esta URL si es necesario

  constructor(private http: HttpClient) {}

  crearRecompensa(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
