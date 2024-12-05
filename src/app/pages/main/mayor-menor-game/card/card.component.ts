import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() value!: string; // Valor de la carta
  @Input() suit!: string;  // Palo de la carta
  @Input() hidden: boolean = false; // Por defecto, la carta está visible

  validValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  validSuits = ['♥', '♦', '♣', '♠'];

  ngOnInit() {
    if (!this.validValues.includes(this.value)) {
      throw new Error(`Valor de carta inválido: ${this.value}`);
    }
    if (!this.validSuits.includes(this.suit)) {
      throw new Error(`Palo de carta inválido: ${this.suit}`);
    }
  }
}
