import { AuthService } from 'src/app/servicios/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonCardHeader, IonCard, IonCardTitle, IonCardContent, IonItem, IonInput, IonButton, IonToolbar } from "@ionic/angular/standalone";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonButton, IonInput, IonItem, IonCardContent, IonCardTitle, IonCard, IonCardHeader,ReactiveFormsModule, FormsModule, CommonModule ]
})
export class LoginFormComponent  implements OnInit {

  usuario: string = '';
  clave: string = '';
  tipoUsuario!: Number;


  private fb = inject(FormBuilder);

  
  loginForm!: FormGroup;



  constructor(private AuthService: AuthService, 
              private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.loginForm = this.fb.group({
      usuario: ['',[Validators.required]],
      clave: ['', [Validators.required]],
    });
  }



  async onLogin() {
    const { usuario, clave } = this.loginForm.value;
  
    this.AuthService.login(usuario, clave).subscribe(
      async (response) => {
        if (response.success) {
          console.log(response);
          this.tipoUsuario = response.usuarioLvl;
          console.log('Inicio de sesión exitoso');
          
          // Mostrar toast y navegar según el tipo de usuario
          if (response.usuarioLvl === 2) {
            await this.handleLoginSuccess('/alumno', response.nombre_usuario);
          } else if (response.usuarioLvl === 1) {
            await this.handleLoginSuccess('/home-docente', response.nombre_usuario);
          }
        } else {
          this.presentToast('Usuario o contraseña incorrectos');
          console.log('Usuario o contraseña incorrectos');
        }
      },
      async (error) => {
        await this.presentToast('Error en el inicio de sesión');
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
  
  // Maneja el toast y la navegación en una función separada
  private async handleLoginSuccess(route: string, username: string) {
    await this.presentToast(`Bienvenido ${username}`);
    this.router.navigate([route]);
  }
  
  // Mostrar el toast
  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }
  
}
