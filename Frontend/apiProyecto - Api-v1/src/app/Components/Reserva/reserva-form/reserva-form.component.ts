import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../../../services/api.service';
import { FormFormComponent } from '../../Form/form-form/form-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-reserva-form',
  imports: [
     CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './reserva-form.component.html',
  styleUrl: './reserva-form.component.css'
})
export class ReservaFormComponent {
  @Input() form: any;
  @Output() cerrar = new EventEmitter<boolean>();

  formForm!: FormGroup;
  isEditMode = false;
  clientes : any;
  vehiculos : any;


  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<FormFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = data;
  }

  ngOnInit(): void {
    this.isEditMode = !!this.form;
    const now = new Date().toISOString();

    this.formForm = this.fb.group({
      id: [this.form?.id || 0],
      isDeleted: [false],
       clienteId: [this.form?.clienteId || '', Validators.required],
    vehiculoId: [this.form?.vehiculoId || '', Validators.required],
    MarcaVehiculo: '',
    PlacaVehiculo: '',
    ModeloVehiculo: '',
    NombreCompletoCLiente: '',
      fechaReserva: [this.form?.fechaReserva || now, Validators.required],
      fechaEntrega: [this.form?.fechaEntrega || now, Validators.required],
      fechaEntregado: [this.form?.fechaEntregado || now],
      date: [this.form?.date || now]
    });
    this.cargarClientes();
    this.cargarVehiculos();

  }

  guardarform() {
    const reserva = this.formForm.value;

    if (this.isEditMode) {
      this.apiService.update('reserva', reserva).subscribe(() => {
        console.log("Reserva actualizada");
        this.dialogRef.close('reload');
      });
    } else {
      this.apiService.Crear('reserva', reserva).subscribe(() => {
        console.log("Reserva creada");
        this.dialogRef.close('reload');
      });
    }
  }

  cargarClientes() {
  this.apiService.ObtenerTodo('Cliente').subscribe((data: any) => {
    this.clientes = data;
  });
}

cargarVehiculos() {
  this.apiService.ObtenerTodo('Vehiculo').subscribe((data: any) => {
    this.vehiculos = data;
  });
}
}
