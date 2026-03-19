import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmDialogData {
    title: string;
    message: string;
}

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule],
    template: `
    <div class="dialog-wrapper">
      <h2 mat-dialog-title>{{ data.title }}</h2>
      <mat-dialog-content>
        <p>{{ data.message }}</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="dialogRef.close(false)">Cancel</button>
        <button mat-flat-button color="warn" (click)="dialogRef.close(true)">Confirm</button>
      </mat-dialog-actions>
    </div>
  `,
    styles: [`
      .dialog-wrapper { padding: 8px; }
      h2 { font-weight: 500; }
      p { color: var(--text-secondary); line-height: 1.5; margin: 0; }
    `],
})
export class ConfirmDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
    readonly data: ConfirmDialogData = inject(MAT_DIALOG_DATA);
}
