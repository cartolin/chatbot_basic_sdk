import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatQueryResponse } from '../models/chat-model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl = 'http://localhost:3000/chat/query';

  constructor(private http: HttpClient) { }

  getAnswer(question: string): Observable<ChatQueryResponse> {
    return this.http.post<ChatQueryResponse>(this.apiUrl, { question });
  }
}
