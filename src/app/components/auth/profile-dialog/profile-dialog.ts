import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <div class="p-6 bg-white rounded-[4px]">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-black text-black! tracking-tighter uppercase">Profil szerkesztése</h2>
          <p class="text-gray-400 text-xs font-semibold uppercase tracking-widest">Saját adatok módosítása</p>
        </div>
        <button mat-icon-button (click)="dialogRef.close()" class="text-gray-400">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <form (submit)="save()" class="space-y-6">
        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Felhasználónév</label>
          <div class="relative">
            <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 scale-75">person</mat-icon>
            <input 
              name="username" 
              [(ngModel)]="userData.username" 
              class="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all font-semibold rounded-[4px]"
              placeholder="Username"
            >
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Új Jelszó (opcionális)</label>
          <div class="relative">
            <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 scale-75">lock</mat-icon>
            <input 
              name="password" 
              type="password"
              [(ngModel)]="userData.password" 
              class="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all font-semibold rounded-[4px]"
              placeholder="Hagyd üresen, ha nem akarod módosítani"
            >
          </div>
        </div>

        <div class="flex gap-4 pt-4">
          <button mat-button type="button" (click)="dialogRef.close()" 
                  class="flex-1 py-6! text-black! font-bold uppercase tracking-widest text-xs rounded-[4px]!">
            Mégse
          </button>
          <button mat-flat-button type="submit" 
                  class="flex-1 py-6! bg-black! text-white! font-bold uppercase tracking-widest text-xs rounded-[4px]!">
            Mentés
          </button>
        </div>
      </form>
    </div>
  `
})
export class ProfileDialogComponent {
  authService = inject(AuthService);
  dialogRef = inject(MatDialogRef<ProfileDialogComponent>);
  snackBar = inject(MatSnackBar);

  userData = {
    username: this.authService.currentUser()?.username || '',
    password: ''
  };

  save() {
    this.authService.updateProfile(this.userData).subscribe({
      next: () => {
        this.snackBar.open('Profil sikeresen frissítve!', 'OK', { duration: 3000 });
        this.dialogRef.close();
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Sikertelen frissítés', 'OK', { duration: 3000 });
      }
    });
  }
}
