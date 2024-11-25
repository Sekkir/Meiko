import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController,NavController,ToastController,IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonItem, IonIcon, IonItemDivider, IonList, IonChip, IonButton, IonTabButton } from '@ionic/angular/standalone';
import { TareasService } from '../../servicios/tareas/tareas.service';
import { addIcons } from 'ionicons';
import { documentTextOutline, starOutline, personOutline, checkmarkCircle, closeCircle, hourglass, calendarOutline, ellipsisHorizontalOutline, checkmarkCircleOutline, closeCircleOutline, camera, navigate } from 'ionicons/icons';
import { EstudiantesService } from 'src/app/servicios/estudiantes/estudiantes.service';



@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
  standalone: true,
  imports: [IonButton,IonCardHeader, IonList,  IonIcon, IonItem, IonLabel, IonCardContent, IonCardTitle, IonCard, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetalleTareaPage implements OnInit {
  estudiantes: any[] = [];
  tareaDetalle: any;
  id_curso!: number;
  id_seccion!: number;
  id_tarea!: number;
  showOptions: boolean = false; // Controlar la visibilidad de los íconos


  constructor(
    private route: ActivatedRoute,
    private tareasService: TareasService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private alertController: AlertController,
    private estudiantesService: EstudiantesService,
  ) {addIcons({checkmarkCircleOutline,closeCircleOutline,camera,ellipsisHorizontalOutline,documentTextOutline,starOutline,calendarOutline,checkmarkCircle,closeCircle,hourglass,personOutline}); }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id_curso = Number(params.get('id_curso'));
      this.id_seccion = Number(params.get('id_seccion'));
      this.id_tarea = Number(params.get('id_tarea'));

      
            // Guardar los parámetros en sessionStorage
            sessionStorage.setItem('id_curso', this.id_curso.toString());
            sessionStorage.setItem('id_seccion', this.id_seccion.toString());

      console.log('Curso: ',this.id_curso,'seccion',this.id_seccion, 'tarea: ',this.id_tarea,)
      // Llama a una función para cargar los detalles de la tarea
      
    });
    this.loadDetalleTarea();
    this.loadEstudiantesTarea();
  }
  
  loadDetalleTarea() {
    this.tareasService.getDetalleTarea(this.id_tarea).subscribe({
      next: (data) => {
        // Agregar console log para verificar los datos que recibes
        console.log('Datos recibidos de la API:', data);
        
        this.tareaDetalle = data.tareas[0];

        console.log(this.tareaDetalle.titulo_tarea)
  
        // Verificar que los datos de tareaDetalle y estudiantes no estén vacíos
        console.log('Tarea Detalle:', this.tareaDetalle);
      },
      error: (err) => {
        console.error('Error al cargar el detalle de la tarea:', err);
      },
    });
  }
  

  loadEstudiantesTarea() {
    this.tareasService.getEstudiantesTarea(this.id_tarea).subscribe({
      next: (data) => {
        console.log('Datos recibidos de la API (Estudiantes):', data);
        this.estudiantes = data.estudiantes;
        console.log('Estudiantes:', this.estudiantes);
      },
      error: (err) => {
        console.error('Error al cargar los estudiantes de la tarea:', err);
      },
    });
  }

  getIconoEstado(estado: string): string {
    switch (estado) {
      case 'ENTREGADA': return 'checkmark-circle';
      case 'NO ENTREGADA': return 'close-circle';
      case 'PENDIENTE': return 'hourglass';
      default: return 'help-circle';
    }
  }
  
  getColorEstado(estado: string): string {
    switch (estado) {
      case 'ENTREGADA': return 'success';
      case 'NO ENTREGADA': return 'danger';
      case 'PENDIENTE': return 'warning';
      default: return 'medium';
    }
  }

  // Método para alternar las opciones de "Entregado" y "No Entregado"
  toggleOptions(estudiante: any) {
    estudiante.showOptions = !estudiante.showOptions; // Alternar la visibilidad de las opciones para el estudiante
  }

  // Método para marcar el estado como "Entregado"
  markAsEntregado(estudiante: any) {
    console.log(`${estudiante.nombres_usuario} ${estudiante.apellidos_usuario} marcado como entregado`);
  
    // Actualizar el estado en el backend
    this.tareasService.updateEstadoEstudiante(estudiante.id_tarea_estudiante, 'ENTREGADA').subscribe({
      next: (response) => {
        console.log('Estado actualizado correctamente', response);
        estudiante.estado = 'ENTREGADA'; // Actualizar el estado en la UI
        estudiante.showOptions = false; // Ocultar las opciones después de la selección
      },
      error: (err) => {
        console.error('Error al actualizar el estado', err);
      }
    });
  }
  
  markAsNoEntregado(estudiante: any) {
    console.log(`${estudiante.nombres_usuario} ${estudiante.apellidos_usuario} marcado como no entregado`);
  
    // Actualizar el estado en el backend
    this.tareasService.updateEstadoEstudiante(estudiante.id_tarea_estudiante, 'NO ENTREGADA').subscribe({
      next: (response) => {
        console.log('Estado actualizado correctamente', response);
        estudiante.estado = 'NO ENTREGADA'; // Actualizar el estado en la UI
        estudiante.showOptions = false; // Ocultar las opciones después de la selección
      },
      error: (err) => {
        console.error('Error al actualizar el estado', err);
      }
    });
  }




  async finalizarEntrega() {
    if (!this.id_tarea) return;
    try {
      this.tareasService.finalizarEntrega(this.id_tarea);
      this.mostrarToast('Tarea finalizada correctamente.');
      // Cierra la página actual y regresa a la anterior
      this.navCtrl.pop();
    } catch (error) {
      console.error('Error al finalizar tarea:', error);
      this.mostrarToast('Error al finalizar tarea.');
    }
  }

  private async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }
  
  
  // Método para mostrar el alert
  async confirmarFinalizacion() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Desea finalizar con estos resultados?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Finalización cancelada');
          },
        },
        {
          text: 'Sí',
          handler: () => {
            this.finalizarEntrega();
            this.loadEstudiantes(); // Llama al método para finalizar la tarea
          },
        },
      ],
    });

    await alert.present();
  }

  loadEstudiantes() {
    const id_curso = this.id_curso;
    this.estudiantesService.getEstudiantesByCurso(id_curso).subscribe(
      (response) => {
        if (response.success) {
          // Ordena los estudiantes de mayor a menor por el puntaje
          this.estudiantes = response.estudiantes
            .sort((a: any, b: any) => b.puntaje - a.puntaje); // De mayor a menor
        } else {
          console.error("No se encontraron estudiantes para este curso.");
        }
      },
      (error) => {
        console.error("Error al cargar estudiantes y puntajes:", error);
      }
    );
  }
  
  
}
