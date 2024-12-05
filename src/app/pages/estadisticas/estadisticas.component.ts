import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [HeaderComponent, NgIf, CommonModule, FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.scss'
})
export class EstadisticasComponent {

  partidas: any[] = []; // Array para almacenar las partidas del juego seleccionado
  juegos: string[] = ['partidas-adivina-la-bandera', 'partidas-ahorcado', 'partidas-wordle', 'partidas-mayor-menor']; // Los juegos disponibles
  juegoSeleccionado: string = this.juegos[0]; // Juego seleccionado por defecto
  loading: boolean = true;

  constructor(private firebaseSvc: FirebaseService) {}

  ngOnInit(): void {
    this.obtenerEstadisticas();
  }

  async obtenerEstadisticas() {
    try {
      this.loading = true; // Iniciar el estado de carga
      this.partidas = await this.firebaseSvc.obtenerPartidasPorJuego(this.juegoSeleccionado); // Obtener partidas del juego seleccionado
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
    } finally {
      this.loading = false; // Finalizar el estado de carga
    }
  }

  // Función para cambiar el juego seleccionado
  onJuegoSeleccionado(juego: string) {
    this.juegoSeleccionado = juego;
    this.obtenerEstadisticas(); // Volver a obtener las estadísticas del juego seleccionado
  }
}
