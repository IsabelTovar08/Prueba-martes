import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../services/api.service';
import { FormUserComponent } from '../../User/form-user/form-user.component';
import { FormModuleComponent } from '../../Module/form-module/form-module.component';
import { FormModuleFormComponent } from '../form-module-form/form-module-form.component';

@Component({
  selector: 'app-list-module-form',
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './list-module-form.component.html',
  styleUrl: './list-module-form.component.css'
})
export class ListModuleFOrmComponent {
  moduleForms: [] = [];
  moduleFormseleccionado?: any;
  filteredmoduleForms: any[] = [];


  displayedColumns: string[] = [ 'nameForm', 'nameModule', 'actions'];

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarmoduleForms();
  }
cargarmoduleForms(){
  this.apiService.ObtenerTodo('moduleForm').subscribe(moduleForms => {
    this.moduleForms = moduleForms;
    console.log(moduleForms)
  })
}
  openFormCreate(): void {
    const dialogRef = this.dialog.open(FormModuleFormComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarmoduleForms(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  editmoduleForms(moduleForms: any): void {
    // Abre el formulario con los datos del moduleForms
    const dialogRef = this.dialog.open(FormModuleFormComponent, {
      width: '400px',
      data: this.moduleFormseleccionado
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarmoduleForms(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  deletemoduleForms(moduleForms: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el moduleForms: ${moduleForms.nameForm} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#765dfb',
      cancelButtonColor: '#d5d7f9',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.apiService.delete('moduleForm', moduleForms.id).subscribe(() => {
        this.cargarmoduleForms();
       })
      }
    });
  }
}
