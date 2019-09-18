import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Message } from './model/message';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socket: WebSocketSubject<Message>;
  // public socket$ = this.socket.asObservable();
  constructor() {
    this.socket = webSocket('ws://127.0.0.1:3000');
  }

  public send(message: Message) {
    this.socket.next(message);
  }
}
