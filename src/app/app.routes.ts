import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'docente',
    loadComponent: () => import('./pages/docente/docente.page').then( m => m.DocentePage)
  },
  {
    path: 'crear-tarea',
    loadComponent: () => import('./pages/crear-tarea/crear-tarea.page').then( m => m.CrearTareaPage)
  },
  {
    path: 'crear-tarea/:id_curso',
    loadComponent: () => import('./pages/crear-tarea/crear-tarea.page').then( m => m.CrearTareaPage)
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home-docente',
    loadComponent: () => import('./pages/home-docente/home-docente.page').then( m => m.HomeDocentePage)
  },
  { path: 'docente/:id_curso/:id_seccion',
    loadComponent: () => import('./pages/docente/docente.page').then( d => d.DocentePage)
  },   
  {
    path: 'detalle-tarea/:id_curso/:id_seccion/:id_tarea',
    loadComponent: () => import('./pages/detalle-tarea/detalle-tarea.page').then( m => m.DetalleTareaPage)
  },
  {
    path: 'alumno',
    loadComponent: () => import('./pages/alumno/alumno.page').then( m => m.AlumnoPage)
  },
  {
    path: 'tareas-activas',
    loadComponent: () => import('./pages/tareas-activas/tareas-activas.page').then( m => m.TareasActivasPage)
  },
  {
    path: 'tareas-activas',
    loadComponent: () => import('./pages/tareas-activas/tareas-activas.page').then( m => m.TareasActivasPage)
  },

];
