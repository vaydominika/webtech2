import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Cat } from '../../services/cat.service';

@Component({
  selector: 'app-cat-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './cat-dialog.html'
})
export class CatDialogComponent {
  catForm: FormGroup;
  isEdit: boolean;
  selectedTraits: string[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cat | null
  ) {
    this.isEdit = !!data;
    this.selectedTraits = data?.description || [];
    
    this.catForm = this.fb.group({
      name: [data?.name || '', Validators.required],
      estimatedAge: [data?.estimatedAge || 0],
      gender: [data?.gender || 'hím', Validators.required],
      color: [data?.color || '', Validators.required],
      breed: [data?.breed || ''],
      arrivalDate: [data?.arrivalDate ? new Date(data.arrivalDate) : new Date(), Validators.required],
      status: [data?.status || 'örökbefogadható', Validators.required]
    });
  }

  toggleDescription(trait: string) {
    const index = this.selectedTraits.indexOf(trait);
    if (index >= 0) {
      this.selectedTraits.splice(index, 1);
    } else {
      this.selectedTraits.push(trait);
    }
  }

  isTraitSelected(trait: string): boolean {
    return this.selectedTraits.includes(trait);
  }

  onSubmit() {
    if (this.catForm.valid) {
      const formValue = this.catForm.value;
      const processedData = {
        ...formValue,
        description: this.selectedTraits
      };
      this.dialogRef.close(processedData);
    }
  }
}
