import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebRTCService {
  private websocket: WebSocketSubject<any>;
  private stream;
  private localHost;
  private readonly hostID;
  constructor() {
    this.websocket = new WebSocketSubject('ws://192.168.50.10:3000/temp');
    this.hostID = this.uuid();
    this.handleWebsocketMessage();
    console.log('create');
  }

  public broadcastFlow(stream) {
    this.stream = stream;
    this.handleWebsocketMessage();
    this.localHost = new RTCPeerConnection();
    this.handleIcecandidate(this.localHost);
  }

  public clientFlow() {
    this.handleWebsocketMessage();
    this.peerConnect();
    this.handleIcecandidate(this.localHost);
  }

  private peerConnect() {
    this.localHost = new RTCPeerConnection({} );
    this.websocket.next({
      type: 'request-offer',
      id: this.hostID
    });
    this.localHost.addEventListener('track', this.getRemoteStream);
  }
  private handleIcecandidate(pc) {
    pc.addEventListener('icecandidate', event => this.websocket.next({
      type: 'icecandidate-state',
      id: this.hostID,
      data: event
    }));
  }
  private handleWebsocketMessage() {
    this.websocket.subscribe(
      message => {
        console.log('message', message);
        switch (message.type) {
          case 'request-offer':
            this.createOffer().then();
            break;
          case 'send-offer':
            this.handleOffer(message).then();
            break;
          case 'send-answer':
            this.handleAnswer(message).then();
            break;
          case 'icecandidate-state':
            console.log(message, '=====================> icecandidate change');
            this.onCandidate(message);
            break;
        }
      }
    );
  }
  private async createOffer() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => this.localHost.addTrack(track, this.stream));
    }
    try {
      console.log('broadcast createOffer start');
      const offer = await this.localHost.createOffer({
        offerToReceiveVideo: 1,
        offerToReceiveAudio: 1
      });
      await this.onCreateOfferSuccess(offer);
    } catch (e) {
        console.log('create offer error');
    }
  }
  private async onCreateOfferSuccess(desc) {
    console.log('offer from broadcast');
    try {
      await this.localHost.setLocalDescription(desc);
      this.websocket.next({
        type: 'send-offer',
        id: this.hostID,
        data: desc,
      });
    } catch (e) {
      console.log('set description error');
    }
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
      } catch (e) {
        console.log('handle answer');
      }
    }
  }

  private onCandidate(message) {
    if (message.id !== this.hostID) {
     this.localHost.addIceCandidate(message.data.candidate).then();
    }
  }

  private getRemoteStream(e) {
    console.log('get stream');
  }


  public uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  public send(message) {
    this.websocket.next(message);
    return  this.websocket;
  }

}
