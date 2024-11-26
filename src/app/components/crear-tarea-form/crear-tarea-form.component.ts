import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de que ReactiveFormsModule está importado
import { IonButton, IonInput, IonItem, IonContent, IonCard, IonHeader, IonToolbar, IonTitle, IonList, IonRow, IonCol, IonSpinner, IonDatetime } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { TareasService } from 'src/app/servicios/tareas/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-crear-tarea-form',
  templateUrl: './crear-tarea-form.component.html',
  styleUrls: ['./crear-tarea-form.component.scss'],
  standalone: true,
  imports: [CommonModule,IonDatetime,IonSpinner, IonCol, IonRow, IonList, IonTitle, IonToolbar, IonHeader, IonCard, ReactiveFormsModule,IonContent, IonItem, IonButton, IonInput],
})
export class CrearTareaFormComponent implements OnInit {
  tareaForm!: FormGroup;
  id_curso!: number;
  id_seccion!: number;

  constructor(private fb: FormBuilder,
              private tareasService: TareasService,
              private router:Router,
              private route: ActivatedRoute,
  ) {}

  ngOnInit() {
      // Obtén los parámetros id_curso y id_seccion de la URL
      this.route.queryParams.subscribe(params => {
      this.id_curso = params['id_curso'];
      this.id_seccion = params['id_seccion'];
    });

    


    // Asegúrate de que el formulario se inicializa aquí
    this.tareaForm = this.fb.group({
      tituloTarea: ['', Validators.required],
      descripcionTarea: ['', Validators.required],
      puntaje: ['', [Validators.required, Validators.pattern(/^\d*\.?\d+$/)]],
      fechaLimite: ['', Validators.required]
        // Asegúrate de que los controles estén correctamente definidos
    });

    
  }

  crearTarea() {
    if (this.tareaForm.invalid) {
      return;
    }

    let tareaData = this.tareaForm.value;

  // Incluir los parámetros id_curso y id_seccion
  tareaData.id_curso = this.id_curso;
  tareaData.id_seccion = this.id_seccion;


    // Convertir la fechaLimite para que sea compatible con el formato SQL
    if (tareaData.fechaLimite) {
      // Reemplazar 'T' por un espacio en la fecha
      tareaData.fechaLimite = tareaData.fechaLimite.replace('T', ' ');
      console.log('Fecha convertida:', tareaData.fechaLimite);
      console.log(this.tareaForm.value);
    }

    // Enviar los datos al servicio para guardarlos en la base de datos
    this.tareasService.crearTarea(tareaData).subscribe(
      (response) => {
        console.log('Tarea creada:', response);
        this.router.navigate([`/docente/${this.id_curso}/${this.id_seccion}`]);  // Redirigir a la página de inicio o donde desees
      },
      (error) => {
        console.error('Error al crear tarea:', error);
      }
    );
  }
}
