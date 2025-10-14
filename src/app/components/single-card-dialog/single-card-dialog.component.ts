import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-single-card-dialog',
  imports: [MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './single-card-dialog.component.html',
})
export class SingleCardDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef);

  closeDialog() {
    this.dialogRef.close();
  }
}
