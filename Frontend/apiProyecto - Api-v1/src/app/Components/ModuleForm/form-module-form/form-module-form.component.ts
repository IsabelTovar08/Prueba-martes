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
  selector: 'app-form-module-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './form-module-form.component.html',
  styleUrl: './form-module-form.component.css'
})
export class FormModuleFormComponent {
  @Input() moduleForm: any;
  @Output() cerrar = new EventEmitter<boolean>();

  forms?: any[];
  modules?: any[];


  moduleFormForm!: FormGroup;
  isEditMode = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, public dialogRef: MatDialogRef<FormModuleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.moduleForm = data;

  }
  cargarforms() {
    this.apiService.ObtenerTodo('module').subscribe(forms => {
      this.forms = forms;
    })
  }
  cargarmodules() {
    this.apiService.ObtenerTodo('form').subscribe(modules => {
      this.modules = modules;
    })
  }

  ngOnInit(): void {
    this.cargarforms();
    this.cargarmodules();
    this.isEditMode = !!this.moduleForm;
    console.log(this.moduleForm)
    this.moduleFormForm = this.fb.group({
      id: [this.moduleForm?.id || 0],
      formId :[this.moduleForm?.formId || '', Validators.required],
      moduleId :[this.moduleForm?.moduleId || '', Validators.required]


    });
  }

  guardarform() {
    console.log(this.moduleFormForm.value)
    if (this.isEditMode) {
      this.apiService.update('ModuleForm', this.moduleFormForm.value).subscribe(() => {
        console.log("update");
        this.dialogRef.close('reload');
      })
    }
    else {
      this.apiService.Crear('ModuleForm', this.moduleFormForm.value).subscribe(() => {
        console.log("creado");
        this.dialogRef.close('reload');
      })
    }
  }
}
