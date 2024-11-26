import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private apiUrl = 'https://bemeiko-production.up.railway.app/api';  // URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener las tareas según curso y sección
  obtenerTareas(curso: number, seccion: number): Observable<any> {
    console.log(`Obteniendo tareas para curso: ${curso} y sección: ${seccion}`);
    return this.http.get(`${this.apiUrl}/tareas/${curso}/${seccion}`);
  }

  crearTarea(tarea: any) {
    return this.http.post(`${this.apiUrl}/crear`, tarea);
  }

  getDetalleTarea(id_tarea: number) {
    console.log('Solicitud al backend con id_tarea:', id_tarea);
    return this.http.get<any>(`${this.apiUrl}/${id_tarea}`);
  }
  
  getEstudiantesTarea(id_tarea: number) {
    return this.http.get<any>(`${this.apiUrl}/estudiantes/${id_tarea}`);
  }

    // Método para actualizar el estado del estudiante
  updateEstadoEstudiante(id_tarea_estudiante: number, estado: string) {
    const url = `${this.apiUrl}/actualizar-estado/${id_tarea_estudiante}`;
    return this.http.put(url, { estado }); // Enviamos el nuevo estado en el cuerpo de la solicitud
  }

  finalizarEntrega(idTarea: number) {
    const url = `${this.apiUrl}/finalizar/${idTarea}`;
    this.http.put(url, {}).subscribe(
      (response) => {
        console.log('Tarea finalizada correctamente:', response);
      },
      (error) => {
        console.error('Error al finalizar tarea:', error);
      }
    );
  }
}
