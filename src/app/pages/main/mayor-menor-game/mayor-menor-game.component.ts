import { Component } from '@angular/core';
import { CardComponent } from "./card/card.component";
import { GameBoardComponent } from "./game-board/game-board.component";
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-mayor-menor-game',
  standalone: true,
  imports: [GameBoardComponent, HeaderComponent],
  templateUrl: './mayor-menor-game.component.html',
  styleUrl: './mayor-menor-game.component.scss'
})
export class MayorMenorGameComponent {

  constructor(private firebaseSvc: FirebaseService){}

  async onGameFinishedScore(event: { score: number; date: Date }) {
    try {
      await this.firebaseSvc.saveGameMayorMenor(event.score, event.date);
    } catch (error) {
      console.error('Error al guardar la partida:', error);
    }
  }

}
