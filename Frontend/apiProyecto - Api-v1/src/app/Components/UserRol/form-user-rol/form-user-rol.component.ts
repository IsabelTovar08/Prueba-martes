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
  selector: 'app-form-user-rol',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './form-user-rol.component.html',
  styleUrl: './form-user-rol.component.css'
})
export class FormUserRolComponent {
  @Input() userRol: any;
  @Output() cerrar = new EventEmitter<boolean>();

  users?: any[];
  roles?: any[];


  userRolForm!: FormGroup;
  isEditMode = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, public dialogRef: MatDialogRef<FormUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userRol = data;

  }
  cargarusers() {
    this.apiService.ObtenerTodo('user').subscribe(users => {
      this.users = users;
    })
  }
  cargarroles() {
    this.apiService.ObtenerTodo('rol').subscribe(roles => {
      this.roles = roles;
    })
  }

  ngOnInit(): void {
    this.cargarusers();
    this.cargarroles();
    this.isEditMode = !!this.userRol;
    console.log(this.userRol)
    this.userRolForm = this.fb.group({
      id: [this.userRol?.id || 0],
      rolId :[this.userRol?.rolId || '', Validators.required],
      userId :[this.userRol?.userId || '', Validators.required]


    });
  }

  guardarform() {
    if (this.isEditMode) {
      this.apiService.update('userRol', this.userRolForm.value).subscribe(() => {
        console.log("update");
        this.dialogRef.close('reload');
      })
    }
    else {
      this.apiService.Crear('userRol', this.userRolForm.value).subscribe(() => {
        console.log("creado");
        this.dialogRef.close('reload');
      })
    }
  }
}
