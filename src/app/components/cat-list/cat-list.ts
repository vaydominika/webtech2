import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CatService, Cat } from '../../services/cat.service';
import { CatDialogComponent } from '../cat-dialog/cat-dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './cat-list.html'
})
export class CatListComponent implements OnInit {
  private catService = inject(CatService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  protected readonly cats = signal<Cat[]>([]);

  ngOnInit() {
    this.loadCats();
  }

  loadCats() {
    this.catService.getCats().subscribe(data => {
      this.cats.set(data);
    });
  }

  openAddCatDialog() {
    const dialogRef = this.dialog.open(CatDialogComponent, {
      width: '600px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.catService.addCat(result).subscribe(() => {
          this.loadCats();
          this.snackBar.open('Cica sikeresen hozzáadva!', 'OK', { duration: 3000 });
        });
      }
    });
  }

  openEditCatDialog(cat: Cat) {
    const dialogRef = this.dialog.open(CatDialogComponent, {
      width: '600px',
      data: cat
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && cat._id) {
        this.catService.updateCat(cat._id, result).subscribe(() => {
          this.loadCats();
          this.snackBar.open('Adatok sikeresen frissítve!', 'OK', { duration: 3000 });
        });
      }
    });
  }

  deleteCat(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Cica Törlése',
        message: 'Biztosan törölni szeretnéd ezt a cicát a nyilvántartásból? Ez a művelet nem vonható vissza.',
        confirmText: 'Törlés',
        cancelText: 'Mégse',
        color: 'warn'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.catService.deleteCat(id).subscribe(() => {
          this.loadCats();
          this.snackBar.open('Cica törölve a rendszerből.', 'OK', { duration: 3000 });
        });
      }
    });
  }
}
