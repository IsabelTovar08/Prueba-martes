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
  selector: 'app-form-module',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './form-module.component.html',
  styleUrl: './form-module.component.css'
})
export class FormModuleComponent {
  @Input() module: any;
  @Output() cerrar = new EventEmitter<boolean>();

  municipios?: any[];

  moduleForm!: FormGroup;
  isEditMode = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, public dialogRef: MatDialogRef<FormModuleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.module = data;

  }

  ngOnInit(): void {
    this.isEditMode = !!this.module;
    console.log(this.module)
    this.moduleForm = this.fb.group({
      id: [this.module?.id || 0],
      name: [this.module?.name || '', Validators.required],
      description: [this.module?.description || '', Validators.required],
      status: [this.module?.status || 1]


    });
  }

  guardarform() {
    if (this.isEditMode) {
      this.apiService.update('module', this.moduleForm.value).subscribe(() => {
        console.log("update");
        this.dialogRef.close('reload');
      })
    }
    else {
      this.apiService.Crear('module', this.moduleForm.value).subscribe(() => {
        console.log("creado");
        this.dialogRef.close('reload');
      })
    }
  }
}

