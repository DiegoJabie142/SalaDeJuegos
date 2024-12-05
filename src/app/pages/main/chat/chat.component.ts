import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat-service.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule, HeaderComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{

  messages: any[] = [];
  messageText: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // Obtener los mensajes en tiempo real
    this.chatService.getMessages((messages) => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.messageText.trim()) {
      this.chatService.sendMessage(this.messageText);
      this.messageText = ''; // Limpiar el campo de mensaje
    }
  }
}
