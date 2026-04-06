import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  color?: 'primary' | 'warn' | 'accent';
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="p-8!">
      <h2 mat-dialog-title class="flex items-center gap-4 text-3xl font-black text-black! tracking-tighter uppercase px-0! pt-0!">
        <mat-icon [color]="data.color === 'warn' ? 'warn' : 'primary'" class="scale-150 inline-block mr-2">{{ data.color === 'warn' ? 'warning' : 'help_outline' }}</mat-icon>
        {{ data.title }}
      </h2>

      <mat-dialog-content class="py-10! px-0!">
        <p class="text-gray-500 font-medium leading-relaxed italic text-lg">{{ data.message }}</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="pb-0! px-0! gap-4!">
        <button mat-button (click)="dialogRef.close(false)" class="p-6! text-black! hover:bg-gray-50 uppercase font-black tracking-widest text-[11px] rounded-[4px]!">
          {{ data.cancelText }}
        </button>
        <button mat-flat-button (click)="dialogRef.close(true)" 
          class="p-6! bg-black! text-white! hover:bg-pastel-pink! hover:text-black! transition-all font-black uppercase tracking-widest text-[11px] rounded-[4px]!"
          [ngClass]="{'bg-red-600!': data.color === 'warn', 'hover:bg-black! hover:text-white!': data.color === 'warn'}">
          {{ data.confirmText }}
        </button>
      </mat-dialog-actions>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}
}
