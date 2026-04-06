import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Person } from '../../services/person.service';

@Component({
  selector: 'app-person-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './person-dialog.html'
})
export class PersonDialogComponent {
  personForm: FormGroup;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Person | null
  ) {
    this.isEdit = !!data;
    this.personForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      phoneNumber: [data?.phoneNumber || '', Validators.required],
      address: [data?.address || '', Validators.required],
      status: [data?.status || 'érdeklődő', Validators.required],
      notes: [data?.notes || '']
    });
  }

  onSubmit() {
    if (this.personForm.valid) {
      this.dialogRef.close(this.personForm.value);
    }
  }
}
