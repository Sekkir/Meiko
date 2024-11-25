import { CrearTareaFormComponent } from './../../components/crear-tarea-form/crear-tarea-form.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonButtons, IonBackButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, CrearTareaFormComponent]
})
export class CrearTareaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
