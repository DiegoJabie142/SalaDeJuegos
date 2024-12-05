import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { UtilsService } from '../../../services/utils.service';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HeaderComponent, MatButtonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor(private router: Router){}

  async redirectToHangman(){
    await this.router.navigate(['main/hangman-game']);
  }

  async redirectToMayorMenor(){
    await this.router.navigate(['main/mayor-menor-game']);
  }

  async redirectToAdivinaLaBandera(){
    await this.router.navigate(['main/adivina-la-bandera-game']);
  }

  async redirectToWordle(){
    await this.router.navigate(['main/wordle-game']);
  }
} 
