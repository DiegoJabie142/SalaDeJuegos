import { Component, EventEmitter, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CardComponent, NgIf, NgFor, CommonModule],
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
  currentCard = this.generateRandomCard();
  nextCard = this.generateRandomCard();
  score = 0;
  lives = 3; // Inicializamos con 3 vidas
  gameOver = false;
  @Output() gameFinishedScore = new EventEmitter<{ score: number; date: Date }>();

  generateRandomCard() {
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const suits = ['♥', '♦', '♣', '♠'];
    return {
      value: values[Math.floor(Math.random() * values.length)],
      suit: suits[Math.floor(Math.random() * suits.length)],
    };
  }

  checkGuess(guess: 'higher' | 'lower' | 'equal') {
    if (this.gameOver) return;
  
    const currentIndex = this.cardValueIndex(this.currentCard.value);
    const nextIndex = this.cardValueIndex(this.nextCard.value);
  
    let guessCorrect = false;
  
    switch (guess) {
      case 'higher':
        guessCorrect = nextIndex > currentIndex;
        break;
      case 'lower':
        guessCorrect = nextIndex < currentIndex;
        break;
      case 'equal':
        guessCorrect = nextIndex === currentIndex;
        break;
    }
  
    if (guessCorrect) {
      this.score = this.score+5;
    } else {
      this.lives--; // Restamos una vida si fallan
      if (this.lives === 0) {
        this.gameOver = true;
        this.gameFinishedScore.emit({ score: this.score, date: new Date() }); // Emitimos el evento
      }
    }
  
    this.currentCard = this.nextCard;
    this.nextCard = this.generateRandomCard();
  }

  cardValueIndex(value: string): number {
    const valuesOrder = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    return valuesOrder.indexOf(value);
  }

  resetGame() {
    this.currentCard = this.generateRandomCard();
    this.nextCard = this.generateRandomCard();
    this.score = 0;
    this.lives = 3; // Reiniciamos las vidas
    this.gameOver = false;
  }
}
