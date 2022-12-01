import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ew-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  title: string = '';
  content: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertComponent>
  ) {
    this.title = this.data.title;
    this.content = this.data.content;
  }

  ngOnInit(): void {
  }

  sendResponse(response: boolean): void {
    this.dialogRef.close({ data: response });
  }

}
