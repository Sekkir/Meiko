import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonRow, IonCol, IonTabButton, IonIcon, IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/servicios/auth.service';
import { EstudiantesService } from 'src/app/servicios/estudiantes/estudiantes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardSubtitle,IonCol, IonRow, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AlumnoPage implements OnInit {

   estudiante: any = [];
   id_estudiante!: Number;

  constructor(
    private authService: AuthService,
    private estudianteService: EstudiantesService,
    private router: Router,
  ) { }

  ngOnInit() {
    
    this.getAlumnoId();
    this.id_estudiante = this.getAlumnoId();
    console.log("id_estudiante Logueado " + this.id_estudiante)
    this.loadDetalle();
  }



    // Obtener el ID del docente desde el token
    private getAlumnoId(): number {
      const token = localStorage.getItem('authToken');
      if (token) {
        const decodedToken = this.authService.decodeToken(token);
        
        return decodedToken.id_usuario;
      }
      return 0;
    }

    private loadDetalle(){
      const id = this.getAlumnoId();
      console.log('ID capturado:', id);
      this.estudianteService.getEstudianteDetalle(id).subscribe((response: any) => {
        if (response.success) {
          this.estudiante = response.estudiantes;
          console.log(this.estudiante);
        } else {
          console.error('No se pudo obtener la información del estudiante');
        }
      }, error => {
        console.error('Error al obtener datos del estudiante', error);
      });
    

    }

    toTareasActivas(){
      this.router.navigate(['/tareas-activas'],
        { queryParams: { estudiante: this.id_estudiante } });
     
    }

}
