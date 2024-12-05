import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import KEY_CHARS from '../../../../constants/keyCharacters';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-hangman-keyboard',
  standalone: true,
  imports: [NgFor],
  templateUrl: './hangman-keyboard.component.html',
  styleUrl: './hangman-keyboard.component.scss'
})


export class HangmanKeyboardComponent {
  @Input() question = '';
  @Output() keyPressed = new EventEmitter<string>();
  keys: IKey[] = [];
  constructor() {
    this.keys = KEY_CHARS.split('').map((key) => {
      return {
        value: key,
        guessed: false,
      };
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes?.['question']?.currentValue &&
      changes?.['question'].currentValue !== changes?.['question'].previousValue
    ) {
      this.addMissingKeys();
    }
  }

  addMissingKeys(): void {
    for (let i = 0; i < this.question.length; i++) {
      const keyExists = this.keys.find((key) => {
        return key.value.toLowerCase() === this.question[i].toLowerCase();
      });
      if (keyExists) {
        continue;
      }
      const randomIndex = Math.floor(Math.random() * 11);
      this.keys.splice(randomIndex, 0, {
        value: this.question[i],
        guessed: false,
      });
    }
  }

  onKeyClick(key: IKey): void {
    if (key.guessed) {
      return;
    }
    key.guessed = true;
    this.keyPressed.emit(key.value);
  }
}


interface IKey {
  value: string;
  guessed: boolean;
}

