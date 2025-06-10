import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../../services/api.service';
import { FormUserComponent } from '../../User/form-user/form-user.component';

@Component({
  selector: 'app-form-rol-form-permission',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './form-rol-form-permission.component.html',
  styleUrl: './form-rol-form-permission.component.css'
})
export class FormRolFormPermissionComponent {
  @Input() rolFormPermission: any;
  @Output() cerrar = new EventEmitter<boolean>();

  forms?: any[];
  roles?: any[];
  permissions?: any[];

  rolFormPermissionForm!: FormGroup;
  isEditMode = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, public dialogRef: MatDialogRef<FormUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.rolFormPermission = data;

  }
  cargarforms() {
    this.apiService.ObtenerTodo('form').subscribe(forms => {
      this.forms = forms;
    })
  }
  cargarpermission() {
    this.apiService.ObtenerTodo('Permission').subscribe(permissions => {
      this.permissions = permissions;
    })
  }
  cargarroles() {
    this.apiService.ObtenerTodo('rol').subscribe(roles => {
      this.roles = roles;
    })
  }

  ngOnInit(): void {
    this.cargarforms();
    this.cargarroles();
    this.cargarpermission();
    this.isEditMode = !!this.rolFormPermission;
    console.log(this.rolFormPermission)
    this.rolFormPermissionForm = this.fb.group({
      id: [this.rolFormPermission?.id || 0],
      rolId :[this.rolFormPermission?.rolId || '', Validators.required],
      formId :[this.rolFormPermission?.formId || '', Validators.required],
      permissionId :[this.rolFormPermission?.permissionId || '', Validators.required]


    });
  }

  guardarform() {
    if (this.isEditMode) {
      this.apiService.update('rolFormPermission', this.rolFormPermissionForm.value).subscribe(() => {
        console.log("update");
        this.dialogRef.close('reload');
      })
    }
    else {
      this.apiService.Crear('rolFormPermission', this.rolFormPermissionForm.value).subscribe(() => {
        console.log("creado");
        this.dialogRef.close('reload');
      })
    }
  }
}
