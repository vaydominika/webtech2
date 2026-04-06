import { Component, signal, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PersonService, Person } from '../../services/person.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../shared/confirm-dialog/confirm-dialog';
import { PersonDialogComponent } from './person-dialog';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatSortModule, 
    MatButtonModule, 
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './person-list.html',
})
export class PersonListComponent implements OnInit {
  private personService = inject(PersonService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  displayedColumns: string[] = ['name', 'status', 'phoneNumber', 'address', 'actions'];
  dataSource = new MatTableDataSource<Person>([]);

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getPeople().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  openAddPersonDialog() {
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '600px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personService.addPerson(result).subscribe(() => {
          this.loadPeople();
          this.snackBar.open('Személy sikeresen hozzáadva!', 'OK', { duration: 3000 });
        });
      }
    });
  }

  openEditPersonDialog(person: Person) {
    const dialogRef = this.dialog.open(PersonDialogComponent, {
      width: '600px',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && person._id) {
        this.personService.updatePerson(person._id, result).subscribe(() => {
          this.loadPeople();
          this.snackBar.open('Személy adatai frissítve!', 'OK', { duration: 3000 });
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePerson(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Személy Törlése',
        message: 'Biztosan törölni szeretnéd ezt a személyt a nyilvántartásból?',
        confirmText: 'Törlés',
        cancelText: 'Mégse',
        color: 'warn'
      } as ConfirmDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personService.deletePerson(id).subscribe(() => {
          this.loadPeople();
          this.snackBar.open('Személy törölve a rendszerből.', 'OK', { duration: 3000 });
        });
      }
    });
  }
}
