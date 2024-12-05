import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';  // Asegúrate de que la ruta sea correcta
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const firebaseService = inject(FirebaseService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  const user = firebaseService.getAuth().currentUser;

  if (user) {
    // Si el usuario está autenticado, permitir la navegación
    return true;
  } else {
    // Si no está autenticado, redirigir al login
    router.navigate(['/auth']);  // Cambia '/auth' a tu ruta de login
    return false;
  }
};
