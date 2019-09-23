import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRTCService {
  private websocket: WebSocketSubject<any>;
  private stream;
  private localHost;
  private offer;
  private readonly hostID;
  public remoteStream = new Subject<any>();
  public remoteStream$ = this.remoteStream.asObservable();
  private offerOptions = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
  };
  constructor() {
    this.websocket = new WebSocketSubject('ws://127.0.0.1:3000/temp');
    this.hostID = this.uuid();
    this.handleWebsocketMessage();
    console.log('create');
  }

  public async broadcastFlow(stream) {
    this.stream = stream;
    this.localHost = new RTCPeerConnection();
    this.stream.getTracks().forEach(track => this.localHost.addTrack(track, this.stream));
    this.offer = await this.localHost.createOffer(this.offerOptions);
    await this.localHost.setLocalDescription(this.offer);
    console.log([this.localHost], 'setlocal des');
    this.handleIcecandidate(this.localHost);
  }

  public clientFlow() {
    this.peerConnect();
    this.handleIcecandidate(this.localHost);
  }

  private peerConnect() {
    this.localHost = new RTCPeerConnection({} );
    this.websocket.next({
      type: 'request-offer',
      id: this.hostID
    });
    this.localHost.addEventListener('track', this.getRemoteStream.bind(this));
  }
  private handleIcecandidate(pc) {
    pc.addEventListener('icecandidate', event => {
      this.websocket.next({
        type: 'icecandidate-state',
        id: this.hostID,
        data: event.candidate
      });
      console.log('send other', event.candidate);
    });
  }
  private handleWebsocketMessage() {
    console.log('create handle');
    this.websocket.subscribe(
      message => {
        console.log('message', message);
        switch (message.type) {
          case 'request-offer':
            console.log('request offer');
            this.createOffer().then();
            break;
          case 'send-offer':
            console.log('send offer');
            this.handleOffer(message).then();
            break;
          case 'send-answer':
            console.log('send answer');
            this.handleAnswer(message).then();
            break;
          case 'icecandidate-state':
            console.log(message, '=====================> icecandidate change');
            this.onCandidate(message).then();
            break;
        }
      }
    );
  }
  private async createOffer() {
    this.websocket.next({
      type: 'send-offer',
      id: this.hostID,
      data: this.offer,
    });
  }

  private async handleOffer(message) {
    if (message.id !== this.hostID) {
      try {
        await this.localHost.setRemoteDescription(message.data);
        const answer = await this.localHost.createAnswer();
        await this.localHost.setLocalDescription(answer);
        this.websocket.next({
          type: 'send-answer',
          id: this.hostID,
          data: answer
        });
      } catch (e) {
        console.log('handle offer error');
      }
    }
  }
  private async handleAnswer(message) {
    if (message.id !== this.hostID) {
      try {
        await this.localHost.setRemoteDescription(message.data);
        console.log(this.localHost, 'broad');
      } catch (e) {
        console.log('handle answer');
      }
    }
  }

  private async onCandidate(message) {
    try {
       await this.localHost.addIceCandidate(message.data);
    } catch (e) {
      console.log('add ice candidate error', e);
    }
  }

  private getRemoteStream(e) {
    console.log('stream', [e]);
    this.remoteStream.next(e.streams[0]);
    console.log([this.localHost], 'remote');
  }


  public uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  public send(message) {
    this.websocket.next({...message, id: this.hostID});
    return  this.websocket;
  }

}
