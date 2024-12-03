import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup } from '@angular/forms';
import { ToastController,IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonCard, IonRow, IonCol, IonButton, IonButtons, IonBackButton, IonLabel, IonInput } from '@ionic/angular/standalone';
import { ActivatedRoute} from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { RecompensasService } from 'src/app/servicios/recompensas/recompensas.service';


@Component({
  selector: 'app-recompensas',
  templateUrl: './recompensas.page.html',
  styleUrls: ['./recompensas.page.scss'],
  standalone: true,
  imports: [IonLabel,IonInput,IonBackButton, IonButtons, ReactiveFormsModule,IonButton, IonCol, IonRow, IonCard, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RecompensasPage implements OnInit {

  id_curso!: Number;
  id_seccion!: Number;
  recompensaForm: FormGroup;
  id_docente!: Number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private recompensasService: RecompensasService,
    private toastController: ToastController,
  ) {
    this.recompensaForm = this.fb.group({
      nombreRecompensa: ['', Validators.required],
      descripcion: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(1)]],
    });
   }

  ngOnInit() {
    this.id_docente = this.getDocenteId();
    console.log("id_Docente que crea tarea: " + this.id_docente)
    this.route.queryParams.subscribe(params => {
      this.id_curso = params['id_curso'];
      this.id_seccion = params['id_seccion'];
    });
  }


  crearRecompensa() {
    if (this.recompensaForm.valid) {
      const recompensaData = {
        ...this.recompensaForm.value,
        id_docente: this.id_docente,  // Agregar el ID del docente
      };
      console.log('Recompensa creada:', recompensaData);

      // Llamar al servicio para crear la recompensa en la base de datos
      this.recompensasService.crearRecompensa(recompensaData).subscribe(
        (response) => {
          console.log('Recompensa creada con éxito:', response);
          // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito
        this.presentToast("La recompensa ha sido añadida!");
        
        },
        (error) => {
          console.error('Error al crear la recompensa:', error);
          // Manejar el error, como mostrar un mensaje de error
          this.presentToast("Error al cargar su recompensa :(");
        
        }
      );
    } else {
      console.log('Formulario inválido');
    }
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


    private async presentToast(message: string) {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }


}
