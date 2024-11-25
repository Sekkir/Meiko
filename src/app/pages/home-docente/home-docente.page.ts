import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonButtons, IonBackButton, IonButton, IonList, IonItem, IonIcon, IonLabel, IonChip } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { enterOutline, libraryOutline } from 'ionicons/icons';
import { CursosService } from 'src/app/servicios/cursos/cursos.service';

@Component({
  selector: 'app-home-docente',
  templateUrl: './home-docente.page.html',
  styleUrls: ['./home-docente.page.scss'],
  standalone: true,
  imports: [IonChip, IonLabel, IonIcon, IonItem, IonList, IonButton, IonBackButton, IonButtons, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomeDocentePage implements OnInit {

  secciones: any[] = [];  // Aquí almacenaremos las secciones
  nombre: any[] = []; // Se almacenan los datos del profesor
  cursos: any[] = [];
  
  constructor(
    private cursosService: CursosService,
    private authService: AuthService,
    private router: Router,
  ) {addIcons({libraryOutline,enterOutline});}

  ngOnInit() {
    //this.loadCursos();
  }

  ionViewWillEnter() {
    // Este método se ejecuta cada vez que entras en la página.
    this.loadCursos();
  }

  // Obtener el ID del docente desde el token
  private getDocenteId(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.authService.decodeToken(token);
      console.log("id capturado");
      console.log('Decoded Token:', decodedToken);
      return decodedToken.id_usuario;
    }
    return 0;
  }

  loadCursos() {
    const id_docente = this.getDocenteId();
    this.cursosService.getCursosByDocente(id_docente).subscribe(
      (response) => {
        console.log('Respuesta de cursos:', response);  // Verifica los datos que llegan
        console.log('Valor de response.success:', response.success); 
        if (response.success) {
          this.cursos = response.cursos;
          console.log('Cursos asignados:', response.cursos);  // Verifica los cursos asignados
        } else {
          console.error('No se encontraron secciones para este docente.');
        }
      },
      (error) => {
        console.error('Error al cargar las secciones', error);
      }
    );
  }
  

  toDocente(id_curso: number, id_seccion: number) {
    //this.router.navigate(['/docente', id_curso]);
    this.router.navigate(['/docente', id_curso, id_seccion]);
  }

  logout() {
    this.authService.logout();
    this.cursos = [];
  }

}
