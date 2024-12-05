import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const firebaseService = inject(FirebaseService);
  const router = inject(Router);

  // Crear una Observable que se suscribe al estado de autenticación
  return new Observable<boolean>((observer) => {
    firebaseService.getAuth().onAuthStateChanged((user) => {
      if (user) {
        // Si el usuario está autenticado, redirigir a la página principal
        router.navigate(['/main/home']);
        observer.next(false);

      } else {
        observer.next(true);

      }
      observer.complete(); // Termina la observación

    });
  });
};
