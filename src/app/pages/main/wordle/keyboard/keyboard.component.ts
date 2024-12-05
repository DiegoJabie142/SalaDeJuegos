import { NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  standalone: true,
  imports:[NgFor]

})
export class KeyboardComponent {
  @Input() guessedLetters: { letter: string, status: string }[] = []; // Recibe las letras adivinadas y su estado
  @Output() letterClicked = new EventEmitter<string>(); // Emite el evento cuando se hace clic en una letra

  letters: string[] = 'abcdefghijklmnopqrstuvwxyz'.split(''); // Alfabeto para el teclado

  // Función para manejar el click en una letra
  onLetterClick(letter: string): void {
    this.letterClicked.emit(letter); // Emitir la letra seleccionada
  }

  // Obtener el color de cada letra
  getLetterColor(letter: string): string {
    const letterStatus = this.guessedLetters.find(l => l.letter === letter);
    if (letterStatus) {
      switch (letterStatus.status) {
        case 'correct':
          return 'green'; // Correcta (verde)
        case 'misplaced':
          return 'yellow'; // Mal colocada (amarillo)
        case 'incorrect':
          return 'darkgray'; // Incorrecta (gris oscuro)
        default:
          return 'white'; // No intentada (blanco o sin color)
      }
    }
    return 'white'; // Si no tiene estado, es blanca
  }
}
