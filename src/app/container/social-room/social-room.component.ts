import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StreamDialogComponent } from '../../component/stream-dialog/stream-dialog.component';
import { MatDialog } from '@angular/material';
import { pipe } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { WebsocketService } from '../../websocket.service';
import { HttpClient } from '@angular/common/http';
import { WebRTCService } from '../../web-rtc.service';

@Component({
  selector: 'app-social-room',
  templateUrl: './social-room.component.html',
  styleUrls: ['./social-room.component.scss']
})
export class SocialRoomComponent implements OnInit, AfterViewInit {

  constraints = { audio: false, video: true};
  stream: MediaStream;
  streamList;

  constructor(private dialog: MatDialog,
              private http: HttpClient,
              private webRtcService: WebRTCService) { }
  @ViewChild('streamVideo', {static: true}) videoRef: ElementRef;
  ngOnInit() {
    this.streamInit().then();
    this.http.get('stream-list').subscribe(value => {
      this.streamList = value;
    });
  }
  ngAfterViewInit(): void {

  }

  public openDialog() {
    const dialogRef = this.dialog.open(StreamDialogComponent, {
      data: {name: 'jojo', description: 'jojo'}
    });

    dialogRef.afterClosed().pipe(switchMap((result) => {

     return this.webRtcService.send({...result , type: 'init-broadcast', id: this.uuid()});
    })).subscribe(_ => {
      this.webRtcService.broadcastFlow(this.stream);
    });
  }

  private async streamInit() {
    this.stream = await navigator.mediaDevices.getUserMedia(this.constraints);
    this.videoRef.nativeElement.srcObject = this.stream;
  }

  private gotRemoteStream() {
    // this.webRtcService.clientFlow();
  }
  public uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  public me() {
    this.webRtcService.send({data: 'ssss'});
  }


}
