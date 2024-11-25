import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonButtons, IonBackButton, IonList, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, } from '@angular/router';
import { EstudiantesService } from 'src/app/servicios/estudiantes/estudiantes.service';
@Component({
  selector: 'app-tareas-activas',
  templateUrl: './tareas-activas.page.html',
  styleUrls: ['./tareas-activas.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardSubtitle, IonCardTitle,IonList, IonBackButton, IonButtons, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TareasActivasPage implements OnInit {

  id_estudiante!: number;
  tareas_pendientes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private estudiantesService: EstudiantesService,
    ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.id_estudiante = params['estudiante'];
      this.cargarTareasPendientes();
    });

    console.log( "Estudiante Recibido: "+this.id_estudiante);
  }

  cargarTareasPendientes() {
    this.estudiantesService.getTareasPendientes(this.id_estudiante).subscribe(
      (response) => {
        if (response.success) {
          this.tareas_pendientes = response.tareas;
          console.log('Tareas pendientes:', this.tareas_pendientes);
        } else {
          console.error('No se encontraron tareas pendientes.');
        }
      },
      (error) => {
        console.error('Error al cargar tareas pendientes:', error);
      }
    );
  }
}
