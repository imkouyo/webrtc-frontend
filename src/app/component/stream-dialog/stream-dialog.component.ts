import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StreamModel } from '../../model/stream-model';

@Component({
  selector: 'app-stream-dialog',
  templateUrl: './stream-dialog.component.html',
  styleUrls: ['./stream-dialog.component.scss']
})
export class StreamDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<StreamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StreamModel) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
