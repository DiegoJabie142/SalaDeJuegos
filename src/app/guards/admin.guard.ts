import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';  // Asegúrate de importar correctamente
import { CanActivateFn } from '@angular/router';
import { take, map, catchError } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const firebaseService = inject(FirebaseService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  const user = firebaseService.getAuth().currentUser;

  if (user) {
    // Llamamos al servicio para obtener el rol del usuario
    return firebaseService.getUserRole().pipe(
      take(1),  // Tomamos solo el primer valor
      map(role => {
        if (role === 'admin') {
          return true;  // Si el rol es admin, permitimos el acceso
        } else {
          router.navigate(['/']);  // Redirigimos si no es admin
          return false;
        }
      }),
      catchError(() => {
        router.navigate(['/']);  // Si hay error, redirigimos
        return [false];
      })
    );
  } else {
    // Si no hay un usuario autenticado, redirigimos
    router.navigate(['/auth']);
    return false;
  }
};
