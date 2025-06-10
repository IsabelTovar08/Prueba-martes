import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../../services/api.service';
import { FormModuleComponent } from '../../Module/form-module/form-module.component';

@Component({
  selector: 'app-form-permission',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './form-permission.component.html',
  styleUrl: './form-permission.component.css'
})
export class FormPermissionComponent {
  @Input() permission: any;
  @Output() cerrar = new EventEmitter<boolean>();

  municipios?: any[];

  permissionForm!: FormGroup;
  isEditMode = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, public dialogRef: MatDialogRef<FormPermissionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.permission = data;

  }

  ngOnInit(): void {
    this.isEditMode = !!this.permission;
    console.log(this.permission)
    this.permissionForm = this.fb.group({
      id: [this.permission?.id || 0],
      name: [this.permission?.name || '', Validators.required],
      description: [this.permission?.description || '', Validators.required],


    });
  }

  guardarform() {
    if (this.isEditMode) {
      this.apiService.update('permission', this.permissionForm.value).subscribe(() => {
        console.log("update");
        this.dialogRef.close('reload');
      })
    }
    else {
      this.apiService.Crear('permission', this.permissionForm.value).subscribe(() => {
        console.log("creado");
        this.dialogRef.close('reload');
      })
    }
  }
}
