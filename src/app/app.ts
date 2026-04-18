import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SidebarComponent } from './components/sidebar/sidebar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    CommonModule, 
    MatSidenavModule, 
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    MatSnackBarModule,
    SidebarComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  authService = inject(AuthService);
  protected readonly title = signal('Menhely kezelő rendszer');
}
