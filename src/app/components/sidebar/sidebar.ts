import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { ProfileDialogComponent } from '../auth/profile-dialog/profile-dialog';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    RouterLinkActive, 
    MatListModule, 
    MatIconModule, 
    MatDialogModule
  ],
  templateUrl: './sidebar.html'
})
export class SidebarComponent {
  authService = inject(AuthService);
  private dialog = inject(MatDialog);

  openProfile() {
    this.dialog.open(ProfileDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog'
    });
  }
}
