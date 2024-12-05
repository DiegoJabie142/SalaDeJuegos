import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FlagService } from '../../../../services/flag.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, CommonModule]
})
export class GameBoardComponent implements OnInit {

  @Output() gameFinished = new EventEmitter<{ score: number; date: Date }>();

  countries: any[] = [];
  currentCountry: any;
  options: any[] = [];
  score: number = 0;
  lives: number = 3;  // Inicializamos con 3 vidas
  gameOver: boolean = false;

  constructor(private flagService: FlagService) { }

  ngOnInit(): void {
    this.flagService.getCountries().subscribe(data => {
      this.countries = data;
      this.nextQuestion();
    });
  }

  // Función para seleccionar una pregunta aleatoria
  nextQuestion(): void {
    if (this.countries.length === 0) {
      return;
    }

    // Seleccionar un país aleatorio
    const randomCountryIndex = Math.floor(Math.random() * this.countries.length);
    this.currentCountry = this.countries[randomCountryIndex];

    // Verificar que el país tenga la propiedad 'flags'
    if (!this.currentCountry.flags) {
      console.error('Error: El país seleccionado no tiene bandera:', this.currentCountry);
      return;
    }

    // Crear opciones de respuesta con banderas aleatorias
    this.options = [this.currentCountry];

    console.log(this.currentCountry.name.common);

    // Agregar 3 países aleatorios como opciones incorrectas
    while (this.options.length < 4) {
      const randomIndex = Math.floor(Math.random() * this.countries.length);
      const randomCountry = this.countries[randomIndex];
      if (!this.options.includes(randomCountry)) {
        this.options.push(randomCountry);
      }
    }

    // Mezclar las opciones para que la respuesta correcta no siempre esté en el primer lugar
    this.options = this.shuffleArray(this.options);
  }

  // Función para mezclar el arreglo de opciones
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Intercambio
    }
    return array;
  }

  // Verificar la respuesta seleccionada
  checkAnswer(selectedCountry: any): void {
    if (this.gameOver) return;

    // Si la respuesta es correcta, sumar 10 puntos
    if (selectedCountry === this.currentCountry) {
      this.score += 10;  // Acierto: sumamos 10 puntos
    } else {
      this.lives--;  // Si la respuesta es incorrecta, restamos 1 vida
    }

    // Continuar con la siguiente pregunta
    this.nextQuestion();

    // Si las vidas llegan a 0, termina el juego
    if (this.lives === 0) {
      this.gameOver = true;
      this.gameFinished.emit({ score: this.score, date: new Date() }); // Emitimos el evento
    }
  }

  // Reiniciar el juego
  resetGame(): void {
    this.score = 0;
    this.lives = 3;  // Reiniciamos las vidas
    this.gameOver = false;
    this.nextQuestion();
  }
}
