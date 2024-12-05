import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { HangmanDisplayComponent } from './hangman-display/hangman-display.component';
import { HangmanKeyboardComponent } from './hangman-keyboard/hangman-keyboard.component';
import { HangmanQuestionComponent } from './hangman-question/hangman-question.component';
import { HangmanService } from '../../../services/hangman.service';
import { Location, NgIf } from '@angular/common';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-hangman-game',
  standalone: true,
  imports: [HeaderComponent, HangmanDisplayComponent, HangmanKeyboardComponent, HangmanQuestionComponent, NgIf],
  templateUrl: './hangman-game.component.html',
  styleUrl: './hangman-game.component.scss'
})
export class HangmanGameComponent {

  finalScore: number | null = null;
  
  question: string = '';
  questions: string[] = [];
  guesses: string[] = [];
  category: string = '';
  restartGameBtnShown = false;

  constructor(
    private hangmanService: HangmanService,
    private firebaseSvc: FirebaseService
  ) {}

  ngOnInit(): void {
    this.pickNewQuestion();
  }

  guess(letter: string) {
    if (!letter || this.guesses.includes(letter)) {
      return;
    }
    this.guesses = [...this.guesses, letter];
  }

  dummyClick() {
    const key = prompt('Enter a key') || '';
    this.guess(key);
  }

  reset() {
    this.guesses = [];
    this.pickNewQuestion();
    this.restartGameBtnShown = false;
  }

  pickNewQuestion() {
    this.hangmanService.getQuestions().subscribe((response) => {
      this.questions = response.map((word) => word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase());
      const randomIndex = Math.floor(Math.random() * this.questions.length);
      this.question = this.questions[randomIndex];
      console.log(this.question);
    });   
  }

  onGameFinished() {
    this.restartGameBtnShown = true;
  }

  async onGameFinishedScore(event: { score: number; date: Date }) {
    try {
      await this.firebaseSvc.saveGameAhorcado(event.score, event.date);
    } catch (error) {
      console.error('Error al guardar la partida:', error);
    }
  }
}
