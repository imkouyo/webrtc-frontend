import { Component, Input, OnInit } from '@angular/core';
import { StreamModel } from '../../model/stream-model';

@Component({
  selector: 'app-stream-item',
  templateUrl: './stream-item.component.html',
  styleUrls: ['./stream-item.component.scss']
})
export class StreamItemComponent implements OnInit {

  @Input() streamItem: StreamModel;
  constructor() { }

  ngOnInit() {
  }

}
