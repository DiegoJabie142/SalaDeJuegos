import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth-guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'auth',
      pathMatch: 'full',
    },
    {
      path: 'auth',
      loadComponent: () => import('./pages/auth/auth.component').then( m => m.AuthComponent), 
      canActivate: [noAuthGuard]
    },
    {
      path: 'auth/sign-up',
      loadComponent: () => import('./pages/auth/sign-up/sign-up.component').then( m => m.SignUpComponent), 
      canActivate: [noAuthGuard],
    },
    {
      path: 'main/home',
      loadComponent: ()=> import('./pages/main/home/home.component').then(m=>m.HomeComponent),
      canActivate: [authGuard]
    },
    {
      path: 'main/hangman-game',
      loadComponent: ()=> import('./pages/main/hangman-game/hangman-game.component').then(m=>m.HangmanGameComponent),
      canActivate: [authGuard]
    },
    {
      path: 'main/mayor-menor-game',
      loadComponent: ()=> import('./pages/main/mayor-menor-game/mayor-menor-game.component').then(m=>m.MayorMenorGameComponent),
      canActivate: [authGuard]
    },
    {
      path: 'main/wordle-game',
      loadComponent: ()=> import('./pages/main/wordle/wordle.component').then(m=>m.WordleComponent),
      canActivate: [authGuard]
    },
    {
      path: 'main/adivina-la-bandera-game',
      loadComponent: ()=> import('./pages/main/adivina-la-bandera-game/adivina-la-bandera-game.component').then(m=>m.AdivinaLaBanderaGameComponent),
      canActivate: [authGuard]
    },
    {
      path: 'main/chat',
      loadComponent: ()=> import('./pages/main/chat/chat.component').then(m=>m.ChatComponent),
      canActivate: [authGuard]
    },
    {
      path: 'quien-soy',
      loadComponent: ()=> import('./pages/sobre-mi/sobre-mi.component').then(m=>m.SobreMiComponent)
    },
    {
      path: 'encuesta',
      loadComponent: ()=> import('./pages/encuesta/encuesta.component').then(m=>m.EncuestaComponent)
    },
    {
      path: 'estadisticas',
      loadComponent: ()=> import('./pages/estadisticas/estadisticas.component').then(m=>m.EstadisticasComponent)
    },
    {
      path: 'ver-encuestas',
      loadComponent: ()=> import('./pages/ver-encuestas/ver-encuestas.component').then(m=>m.VerEncuestasComponent),
      canActivate: [adminGuard],  // Protege la ruta con el guard
    },
    
];
