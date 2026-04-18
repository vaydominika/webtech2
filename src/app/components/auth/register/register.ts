import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatCardModule, 
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './register.html',
})
export class RegisterComponent {
  userData = { username: '', password: '' };
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  register() {
    this.authService.register(this.userData).subscribe({
      next: () => {
        this.snackBar.open('Sikeres regisztráció! Most már bejelentkezhetsz.', 'OK', { duration: 3000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Hiba a regisztráció során.', 'Hiba', { duration: 3000 });
      }
    });
  }
}
