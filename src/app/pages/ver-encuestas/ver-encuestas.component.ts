import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ver-encuestas',
  standalone: true,
  imports: [HeaderComponent, NgIf, NgFor, CommonModule],
  templateUrl: './ver-encuestas.component.html',
  styleUrl: './ver-encuestas.component.scss'
})
export class VerEncuestasComponent {

  encuestas: any[] = [];  // Guardará las encuestas desde Firestore
  formattedEncuestas: any[] = [];  // Guardará las encuestas ya formateadas

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.loadEncuestas();
  }

  // Función para obtener las encuestas
  loadEncuestas(): void {
    this.firebaseService.getEncuestas().then(encuestas => {
      this.encuestas = encuestas;
      this.formatEncuestas();
    }).catch(error => {
      console.error('Error al obtener encuestas', error);
    });
  }

  // Función para formatear los datos de las encuestas
  formatEncuestas(): void {
    this.formattedEncuestas = this.encuestas.map(encuesta => {
      const formatted = { ...encuesta };
      if (formatted.resultado.juegos && Array.isArray(formatted.resultado.juegos)) {
        // Si juegos es un array, lo unimos en una cadena separada por comas
        formatted.resultado.juegosFormatted = formatted.resultado.juegos.join(', ');
      } else {
        formatted.resultado.juegosFormatted = 'Ninguno';
      }
      return formatted;
    });
  }
}
