import { Component } from '@angular/core';
import { ChatPageComponent } from './chat/page/chat-page/chat-page.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [ChatPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'widget';
}
