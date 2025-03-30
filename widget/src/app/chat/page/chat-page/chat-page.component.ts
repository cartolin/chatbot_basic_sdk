import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatMessage } from '../../../core/models/chat-model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-chat-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css'
})
export class ChatPageComponent {
  messages: ChatMessage[] = [
    { from: 'bot', text: '¡Hola! ¿En qué puedo ayudarte?' }
  ];

  inputMessage: string = '';

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  sendMessage(): void {
    const msg = this.inputMessage.trim();
    if (!msg) return; 

    this.messages.push({ from: 'user', text: msg });
    this.inputMessage = '';

    this.scrollToBottom(true);

    setTimeout(() => {
      this.messages.push({ from: 'bot', text: `Respuesta del bot a: ${msg}` });
      setTimeout(() => {
        this.scrollToBottom(true);
      }, 0);
    }, 5000);
  }

  onUserTyping(): void {
    setTimeout(() => {
      this.scrollToBottom(true);
    }, 0);
  }

  private scrollToBottom(smooth: boolean = false): void {
    if (!this.scrollContainer) return;
    this.scrollContainer.nativeElement.scroll({
      top: this.scrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }

  handleClose(): void {
    console.log('Chat cerrado');
    window.parent.postMessage({ type: 'CLOSE_WIDGET' }, '*');
  }
}
