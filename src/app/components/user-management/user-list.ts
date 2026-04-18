import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './user-list.html',
})
export class UserListComponent implements OnInit {
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private apiUrl = 'http://localhost:3000/api/users';

  displayedColumns: string[] = ['username', 'role', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.dataSource.data = data;
    });
  }

  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Felhasználó Törlése',
        message: 'Biztosan törölni szeretnéd ezt a felhasználót?',
        confirmText: 'Törlés',
        cancelText: 'Mégse',
        color: 'warn'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
          this.loadUsers();
          this.snackBar.open('Felhasználó törölve.', 'OK', { duration: 3000 });
        });
      }
    });
  }

  toggleRole(user: any) {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    this.http.patch(`${this.apiUrl}/${user._id}/role`, { role: newRole }).subscribe(() => {
      this.loadUsers();
      this.snackBar.open(`Szerepkör módosítva: ${newRole}`, 'OK', { duration: 3000 });
    });
  }
}
