import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../websocket.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  id: string;
  idForm: FormGroup;
  messageForm: FormGroup;
  webSocketService: WebsocketService;
  constructor(private formBuilder: FormBuilder) {
    this.webSocketService = new WebsocketService();
    this.idForm = formBuilder.group({
      id: '',
    });
    this.messageForm = formBuilder.group( {
      message: '',
    });
  }

  ngOnInit() {
    this.webSocketService.createChatRoom();
    this.webSocketService.socket.subscribe(message => console.log(message));
  }

  public sendMessage(data) {
    console.log(data);

    // this.webSocketService.send({id: this.id, message: data.message});
  }
  public setId(event) {
    console.log(event);
    this.id = event.id;
  }

}
