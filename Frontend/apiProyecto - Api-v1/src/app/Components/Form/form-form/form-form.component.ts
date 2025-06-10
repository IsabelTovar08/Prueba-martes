import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-form-form',
  imports: [ 
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './form-form.component.html',
  styleUrl: './form-form.component.css'
})
export class FormFormComponent {
  @Input() form: any;
  @Output() cerrar = new EventEmitter<boolean>();


  formForm!: FormGroup;
  isEditMode = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, public dialogRef: MatDialogRef<FormFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = data;

  }

  ngOnInit(): void {
    this.isEditMode = !!this.form;
    console.log(this.form)
    this.formForm = this.fb.group({
      id: [this.form?.id || 0],
      name: [this.form?.name || '', Validators.required],
      description: [this.form?.description || '', Validators.required]

    });
  }

  guardarform() {
    if (this.isEditMode) {
      this.apiService.update('form', this.formForm.value).subscribe(() => {
        console.log("update");
        this.dialogRef.close('reload');
      })
    }
    else {
      this.apiService.Crear('form', this.formForm.value).subscribe(() => {
        console.log("creado");
        this.dialogRef.close('reload');
      })
    }
  }
}
