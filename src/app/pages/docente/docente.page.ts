import { TareasService } from './../../servicios/tareas/tareas.service';
import { personOutline, enterOutline, alertCircleOutline } from 'ionicons/icons';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonLabel, IonItem, IonList, IonIcon, IonChip, IonBadge, IonButtons, IonBackButton, IonCard  } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EstudiantesService } from 'src/app/servicios/estudiantes/estudiantes.service';


@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
  standalone: true,
  imports: [ IonCard, IonBackButton, IonButtons, IonBadge, IonChip, IonIcon, IonList, IonItem, IonLabel, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DocentePage implements OnInit {
  //VARIABLES
  estudiantes: any[] = [];
  id_curso!: number;
  tareas: any[] = [];
  id_seccion!: number;
  id_tarea!:Number;
  

  constructor(private route: ActivatedRoute,
    private estudiantesService: EstudiantesService,
    private tareasService: TareasService,
    private router: Router
  ) {
    
    addIcons({alertCircleOutline,personOutline,enterOutline});
   }

   ngOnInit() {

     // Recuperar los parámetros de sessionStorage
     this.id_curso = Number(sessionStorage.getItem('id_curso'));
     this.id_seccion = Number(sessionStorage.getItem('id_seccion'));
 
    // Obtén el parámetro id_curso de la URL
    this.route.paramMap.subscribe(params => {
      this.id_curso = Number(params.get('id_curso'));
      this.id_seccion = Number(params.get('id_seccion'));
      console.log("Cargando info de curso con ID: " + this.id_curso + " Y sección ID: " + this.id_seccion)
      // Llama a la función de carga de datos usando el id_curso
      //this.loadEstudiantes();
      //this.loadTareas();
    });
  }

  ionViewWillEnter() { 
    // Este método se ejecuta cada vez que entras en la página.
    this.loadEstudiantes();
    this.loadTareas();
  }

  loadEstudiantes() {

    const id_curso = this.id_curso;
    this.estudiantesService.getEstudiantesByCurso(id_curso).subscribe(
      (response) => {
        if (response.success) {
          // Ordena los estudiantes de mayor a menor por el puntaje
          this.estudiantes = response.estudiantes
            .sort((a:any, b:any) => b.puntaje - a.puntaje) // De mayor a menor
        } else {
          console.error("No se encontraron estudiantes para este curso.");
        }
      },
      (error) => {
        console.error("Error al cargar estudiantes y puntajes:", error);
      }
    );
  }
  
  getPuntajeClass(puntaje: number): string {
    if (puntaje < 6) {
      return 'puntaje-bajo';
    } else if (puntaje >= 6 && puntaje <= 7) {
      return 'puntaje-medio';
    } else {
      return 'puntaje-alto';
    }
  }


  
  loadTareas() {
    const id_curso = this.id_curso;
    const seccion = this.id_seccion;
    this.tareasService.obtenerTareas(id_curso, seccion) 
      .subscribe(
        (response) => {
          if (response.success) {
            this.tareas = response.tareas;
            console.log('Datos de tareas cargados:', this.tareas); // Confirma que cada tarea contiene id_curso y id_seccion
          } else {
            console.error("No se encontraron tareas para este curso y sección.");
          }
        },
        (error) => {
          console.error("Error al cargar tareas:", error);
        }
      );
  }
  
  detalleTarea(id_curso: number, id_seccion: number, id_tarea: number){
    console.log('id_curso:', id_curso, 'seccion:', id_seccion, 'id_tarea:', id_tarea); 
    this.router.navigate(['/detalle-tarea', id_curso, id_seccion, id_tarea]);

 }

 haciaCrearTarea() {
  this.router.navigate(['/crear-tarea'],
     { queryParams: { id_curso: this.id_curso, id_seccion: this.id_seccion } });
  }

  haciaCrearRecompensa() {
    this.router.navigate(['/recompensas'],
       { queryParams: { id_curso: this.id_curso, id_seccion: this.id_seccion } });
    }
}
