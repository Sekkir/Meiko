import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEstudiantesByCurso(id_curso: number): Observable<any> {
    console.log("Solicitando estudiantes y puntajes para id_curso:", id_curso); // Verifica el id_curso enviado
  
    return this.http.get<any>(`${this.apiUrl}/estudiantes/curso/${id_curso}/estudiantes`).pipe(
      tap(response => {
        console.log("Respuesta de la API:", response); // Verifica la respuesta de la API
      })
    );
  }


  getEstudianteDetalle(idEstudiante: number) {
    return this.http.get(`${this.apiUrl}/estudiantes/seccion/${idEstudiante}`);
  }

    // Método para obtener las tareas pendientes de un estudiante
    getTareasPendientes(id_estudiante: number): Observable<any> {
      const url = `${this.apiUrl}/estudiantes/tareas-pendientes/${id_estudiante}`;
      return this.http.get<any>(url);
    }

}
