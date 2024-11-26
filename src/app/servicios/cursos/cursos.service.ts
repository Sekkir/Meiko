import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';  // Importamos el operador map
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CursosService {
  
  private cursos: any[] = [];

  private apiUrl = 'https://bemeiko-production.up.railway.app/api';  // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener los cursos por ID de docente
  getCursosByDocente(id_docente: number) {
    console.log('Consultando cursos para el docente con ID:', id_docente);
    return this.http.get<any>(`${this.apiUrl}cursos/${id_docente}`).pipe(
      map((response) => {
        // Verifica que la respuesta tenga la propiedad 'cursos'
        console.log('Respuesta de la API:', response);  // Para verificar si el formato es correcto
        return response || [];  // Si la propiedad 'cursos' no existe, retornamos un array vacío, CASI ME CORTO EL WEBO POR ESTA MMDA
      })
    );
  }

    // Método para obtener las secciones por ID del docente
    getSeccionesPorDocente(id_docente: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/secciones/${id_docente}`);
    }

    resetCursos() {
      this.cursos = [];
    }
}
