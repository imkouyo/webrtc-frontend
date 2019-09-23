import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { StreamModel } from './model/stream-model';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  public socket: WebSocketSubject<StreamModel>;
  private chatRoomId;
  constructor() {
    this.createChatRoom();
  }

  public createChatRoom() {
    this.chatRoomId = this.uuid();
    this.socket = webSocket('ws://127.0.0.1:3000/' + this.chatRoomId);
  }

  public send(message: StreamModel) {
    console.log(message);
    this.socket.next(message);
    return this.socket;
  }


  private uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
