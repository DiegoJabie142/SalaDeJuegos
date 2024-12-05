import { Component, inject, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilsService } from '../../../services/utils.service';
import { CommonModule, NgFor } from '@angular/common';
import { authState } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ MatToolbarModule, MatIconModule, MatInputModule, MatButtonModule, NgFor, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() title! : string;
  @Input() back! : boolean;
  @Input() whereToBack : string = '';
  @Input() routes: { name: string, url: string }[] = [];  // Nombre y URL de la ruta

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  auth: any = null;
 isAdmin = false;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.getAuth();
    this.firebaseSvc.getUserRole().subscribe(role => {
      this.isAdmin = role === 'admin'; // Si el rol es "admin", establecer isAdmin en true
    });
  }

  redirectToLogin(){
    this.router.navigateByUrl(this.whereToBack);
  }

  async signOut() {
    try {
      await this.firebaseSvc.signOut(); // Cierra sesión
      
      // Escuchar el estado de autenticación después de cerrar sesión
      authState(this.auth).subscribe(user => {
        if (!user) {
          // Redirige solo si el usuario está efectivamente desconectado
          this.router.navigateByUrl('/auth');
        }
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  getAuth() {
    this.auth = this.firebaseSvc.getAuth();
  }

  redirectTo(route: string){
    this.router.navigateByUrl(route);
  }
}
