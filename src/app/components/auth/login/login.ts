import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatButtonModule, 
    MatInputModule, 
    MatCardModule, 
    MatIconModule,
    MatSnackBarModule,
    RouterModule
  ],
  templateUrl: './login.html',
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/cats']);
        this.snackBar.open('Sikeres bejelentkezés!', 'OK', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Hiba a bejelentkezés során.', 'Hiba', { duration: 3000 });
      }
    });
  }
}
