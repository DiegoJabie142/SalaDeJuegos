import { Component, OnInit } from '@angular/core';
import { WordleService } from '../../../services/wordle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { KeyboardComponent } from "./keyboard/keyboard.component";
import { FirebaseService } from '../../../services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, KeyboardComponent],
})
export class WordleComponent implements OnInit {
  words: string[] = [];
  currentWord: string = '';
  guesses: string[] = []; // Almacena los intentos realizados por el usuario
  userGuess: string = '';
  attemptsLeft: number = 6; // Número total de intentos
  gameOver: boolean = false; // Indicar si el juego ha terminado
  victoryMessage: string = '';
  guessedLetters: { letter: string, status: string }[] = []; // Almacena las letras adivinadas y su estado
  // Nueva estructura para las filas vacías y las celdas vacías
  emptyRows = new Array(6); // Crea 6 filas
  emptyCells = new Array(5); // Crea 5 celdas por fila (una por cada letra)
  letters: string[] = 'abcdefghijklmnopqrstuvwxyz'.split(''); // Definimos el alfabeto
  score: number = 0; // Nueva propiedad para la puntuación

  constructor(private wordleService: WordleService, private firebaseSvc: FirebaseService) {}

  ngOnInit(): void {
    this.wordleService.getWords().subscribe(
      (words) => {
        this.words = words;
        console.log('Palabras de 5 letras:', this.words);
        this.selectWord();
      },
      (error) => {
        console.error('Error al obtener las palabras', error);
      }
    );
  }

  getLetterStatus(letter: string): string {
    const guess = this.guesses.find(g => g.includes(letter));
    if (!guess) return ''; // Si no se ha intentado la letra, no tiene estado

    const index = guess.indexOf(letter);
    if (this.currentWord[index] === letter) return 'correct'; // Letra correcta (verde)
    if (this.currentWord.includes(letter)) return 'misplaced'; // Letra en la palabra, pero mal colocada (amarillo)
    return 'incorrect'; // Letra incorrecta (gris oscuro)
  }

  updateKeyboardState() {
    this.guessedLetters = [];
    this.letters.forEach(letter => {
      const status = this.getLetterStatus(letter);
      if (status) {
        this.guessedLetters.push({ letter, status });
      }
    });
  }

  async onGameFinishedScore(score: number, date: Date ) {
    try {
      await this.firebaseSvc.saveGameWordle(score, date);
    } catch (error) {
      console.error('Error al guardar la partida:', error);
    }
  }

  selectWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    const rawWord = this.words[randomIndex].toLowerCase(); // Seleccionamos la palabra y la convertimos a minúsculas
    this.currentWord = this.removeAccents(rawWord); // Eliminamos los acentos
    console.log('Palabra seleccionada:', this.currentWord);
  }
  
  // Función para eliminar acentos de las letras
  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  async checkGuess(guess: string) {

    guess = guess.toLocaleLowerCase();
    guess = this.removeAccents(guess);

    if (!this.words.includes(guess)) {
      Swal.fire({
        icon: 'error',
        title: 'Palabra inválida',
        text: 'La palabra ingresada no es válida.',
        allowEnterKey: false, // Deshabilita el cierre con Enter
      });
      return;
    }

    guess = this.removeAccents(guess.trim().toLowerCase()); // Convertir la palabra ingresada a minúsculas y quitar acentos


    // Agregar la palabra adivinada a la lista de intentos
    this.guesses.push(guess);
    this.attemptsLeft--; // Reducir intentos disponibles

    // Comprobar si el usuario ha adivinado la palabra correctamente
    if (guess === this.currentWord) {
      this.calculateScore(); // Calcular la puntuación al ganar
      this.victoryMessage = `¡Ganaste! Tu puntuación es: ${this.score} puntos.`;
      this.gameOver = true;
      const date = new Date();
      this.onGameFinishedScore(this.score, date);
    } else if (this.attemptsLeft === 0) {
      this.victoryMessage = `¡Perdiste! La palabra era '${this.currentWord}'. Tu puntuación es: ${this.score} puntos.`;
      this.gameOver = true;
      const date = new Date();
      this.onGameFinishedScore(this.score, date);
    }

    this.updateKeyboardState();
  }

restartGame() {
    this.userGuess = ''; // Limpiar el intento del usuario
    this.guesses = []; // Limpiar los intentos anteriores
    this.attemptsLeft = 6; // Reiniciar los intentos restantes
    this.gameOver = false; // Reiniciar el estado del juego
    this.score = 0; // Reiniciar la puntuación
    this.guessedLetters = []; // Reiniciar el teclado (estado de letras)
    this.selectWord(); // Seleccionar una nueva palabra
    this.updateKeyboardState(); // Actualizar estado inicial del teclado
    console.log('Juego reiniciado');
  }


  getLetterClass(guess: string): string[] {
    if (!guess) return []; // Si no hay intento, devolver un arreglo vacío
  
    // Normalizamos la palabra correcta y la adivinada
    const normalizedCurrentWord = this.removeAccents(this.currentWord.toLowerCase());
    const normalizedGuess = this.removeAccents(guess.toLowerCase());
  
    // Inicializamos un mapa para contar las ocurrencias de cada letra en la palabra correcta
    const letterCount = new Map<string, number>();
    for (const char of normalizedCurrentWord) {
      letterCount.set(char, (letterCount.get(char) || 0) + 1);
    }
  
    // Inicializamos el resultado con una lista de clases vacías
    const result = new Array(guess.length).fill('');
  
    // Paso 1: Evaluar letras en posiciones correctas
    for (let i = 0; i < guess.length; i++) {
      const normalizedGuessLetter = normalizedGuess[i];
  
      if (normalizedGuessLetter === normalizedCurrentWord[i]) {
        result[i] = 'correct'; // Letra en posición correcta
        letterCount.set(normalizedGuessLetter, letterCount.get(normalizedGuessLetter)! - 1);
      }
    }
  
    // Paso 2: Evaluar letras desplazadas o incorrectas
    for (let i = 0; i < guess.length; i++) {
      if (result[i] === '') { // Solo evaluamos las letras que aún no son correctas
        const normalizedGuessLetter = normalizedGuess[i];
  
        if (letterCount.get(normalizedGuessLetter) && letterCount.get(normalizedGuessLetter)! > 0) {
          result[i] = 'misplaced'; // Letra en la palabra pero en posición incorrecta
          letterCount.set(normalizedGuessLetter, letterCount.get(normalizedGuessLetter)! - 1);
        } else {
          result[i] = 'incorrect'; // Letra no está en la palabra
        }
      }
    }
  
    return result;
  }
  
  onLetterClicked(letter: string): void {
    if (!this.gameOver) {
      this.userGuess += letter;
      if (this.userGuess.length === 5) {
        this.checkGuess(this.userGuess);
      }
    }
  }

  calculateScore() {
    // Puntuación basada en intentos restantes
    this.score = this.attemptsLeft * 100 + 100;
  }
}
