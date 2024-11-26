import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CursosService } from './cursos/cursos.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://bemeiko-production.up.railway.app/api';  // Asegúrate de usar la URL correcta
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cursosService: CursosService) {
    // Si ya hay un token en el localStorage, se lo asignamos al currentUserSubject
    const token = localStorage.getItem('authToken');
    if (token) {
      this.currentUserSubject.next(token);
    }
  }

  // Método para hacer login
  login(usuario: string, clave: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { usuario, clave }).pipe(
      tap(response => {
        if (response.success) {
          localStorage.setItem('authToken', response.token);  // Guardamos el token
          this.currentUserSubject.next(response.token);  // Actualizamos el estado del usuario
        }
      })
    );
  }

    // Método para decodificar el token
    decodeToken(token: string): any {
      try {
        return jwtDecode(token);
  // Decodifica el token
      } catch (error) {
        console.error('Error al decodificar el token', error);
        return null;  // Si hay error, retornamos null
      }
    }

      // Obtener el ID del usuario desde el token
  getUserIdFromToken(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken?.id_usuario || 0;  // Devuelve el ID del usuario, o 0 si no lo encuentra
    }
    return 0;  // Si no hay token, devuelve 0
  }

  // Obtener el token guardado en el localStorage
  getToken() {
    return localStorage.getItem('authToken');
  }

  // Verificar si el usuario está logueado
  get isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Logout
  logout() {
    // Limpia todos los datos almacenados
    localStorage.removeItem('token'); // Elimina el token
    localStorage.clear(); // Si usas sessionStorage, utiliza sessionStorage.clear()
    this.cursosService.resetCursos(); // Limpia el estado del servicio
    this.router.navigate(['/login']); // Redirige al login
  }
}
