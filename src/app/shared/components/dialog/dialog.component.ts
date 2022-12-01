import { Component, Inject, Input, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  title: string = '';
  content: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DialogComponent>
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
