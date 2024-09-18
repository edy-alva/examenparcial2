// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';

const routes: Routes = [
  {
    path: '', //url
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'talleres',
        loadComponent: () => import('./talleres/talleres.component').then((m) => m.TalleresComponent)
      },
      {
        path: 'nuevotaller',
        loadComponent: () => import('./talleres/nuevotaller/nuevotaller.component').then((m) => m.NuevotallerComponent),
        
      },
      {
        path: 'editartaller/:Talleres_id',
        loadComponent: () => import('./talleres/nuevotaller/nuevotaller.component').then((m) => m.NuevotallerComponent),
        
      },
      {
        path: 'participantes',
        loadComponent: () => import('./participantes/participantes.component').then((m) => m.ParticipantesComponent)
      },
      {
        path: 'nuevoparticipante',
        loadComponent: () => import('./participantes/nuevoparticipante/nuevoparticipante.component').then((m) => m.NuevoparticipanteComponent),
        
      },
      {
        path: 'editarparticipante/:Participante_id',
        loadComponent: () => import('./participantes/nuevoparticipante/nuevoparticipante.component').then((m) => m.NuevoparticipanteComponent),
        
      },
      {
        path: 'inscripciones',
        loadComponent: () => import('./inscripciones/inscripciones.component').then((m) => m.InscripcionesComponent)
      },
      {
        path: 'nuevainscripcion',
        loadComponent: () => import('./inscripciones/nuevainscripcion/nuevainscripcion.component').then((m) => m.NuevainscripcionComponent),
        
      },
      {
        path: 'editarinscripcion/:Inscripcion_id',
        loadComponent: () => import('./inscripciones/nuevainscripcion/nuevainscripcion.component').then((m) => m.NuevainscripcionComponent),
        
      }


    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
