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
  selector: 'app-formulario',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {
  @Input() rol: any;
  @Output() cerrar = new EventEmitter<boolean>();

  municipios?: any[];

  rolForm!: FormGroup;
  isEditMode = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, public dialogRef: MatDialogRef<FormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.rol = data;

  }

  ngOnInit(): void {
    this.isEditMode = !!this.rol;
    console.log(this.rol)
    this.rolForm = this.fb.group({
      id: [this.rol?.id || 0 ],
      name: [this.rol?.name || '', Validators.required],
      description: [this.rol?.description || '', Validators.required],
    });
  }

  guardarrol() {
    if (this.isEditMode) {
      this.apiService.update('rol', this.rolForm.value).subscribe(() => {
        console.log("update");
        this.dialogRef.close('reload');
      })
    }
    else {
      this.apiService.Crear('rol', this.rolForm.value).subscribe(() => {
        console.log("creado");
        this.dialogRef.close('reload');
      })
    }
  }
}
