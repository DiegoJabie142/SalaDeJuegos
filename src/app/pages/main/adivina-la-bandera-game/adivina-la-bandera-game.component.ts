import { Component } from '@angular/core';
import { GameBoardComponent } from './game-board/game-board.component';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-adivina-la-bandera-game',
  standalone: true,
  imports: [GameBoardComponent, HeaderComponent],
  templateUrl: './adivina-la-bandera-game.component.html',
  styleUrl: './adivina-la-bandera-game.component.scss'
})
export class AdivinaLaBanderaGameComponent {
  constructor(private firebaseSvc: FirebaseService) {}
  
  async onGameFinished(event: { score: number; date: Date }) {
    try {
      await this.firebaseSvc.saveGameAdivinaLaBandera(event.score, event.date);
    } catch (error) {
      console.error('Error al guardar la partida:', error);
    }
  }
}
