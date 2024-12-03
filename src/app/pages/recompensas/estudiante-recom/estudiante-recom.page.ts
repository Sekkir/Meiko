import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonLabel, IonCardContent } from '@ionic/angular/standalone';
import { RecompensasService } from 'src/app/servicios/recompensas/recompensas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estudiante-recom',
  templateUrl: './estudiante-recom.page.html',
  styleUrls: ['./estudiante-recom.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonLabel, IonCardTitle, IonCardHeader, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EstudianteRecomPage implements OnInit {

  id_estudiante!: number;
  recompensas: any[] = [];

  constructor(
    private recompensasService: RecompensasService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.id_estudiante = params['estudiante'];
      this.getRecompensasEstudiante();
    });

  }



  getRecompensasEstudiante() {
    this.recompensasService.getRecompensasByEstudiante(this.id_estudiante).subscribe(response => {
      if (response.success) {
        this.recompensas = response.recompensas;
      } else {
        console.log('No se encontraron recompensas para este estudiante');
      }
    }, error => {
      console.error('Error al obtener las recompensas:', error);
    });
  }

}
