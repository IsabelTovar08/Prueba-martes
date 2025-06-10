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
import { FormRolFormPermissionComponent } from '../form-rol-form-permission/form-rol-form-permission.component';

@Component({
  selector: 'app-list-rol-form-permission',
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './list-rol-form-permission.component.html',
  styleUrl: './list-rol-form-permission.component.css'
})
export class ListRolFormPermissionComponent {
  rolFormPermissions: [] = [];
  rolFormPermissionseleccionado?: any;
  filteredrolFormPermissions: any[] = [];


  displayedColumns: string[] = ['rolId', 'rolName','formId', 'formName', 'permissionId', 'permissionName', 'actions'];

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarrolFormPermissions();
  }
cargarrolFormPermissions(){
  this.apiService.ObtenerTodo('RolFormPermission').subscribe(rolFormPermissions => {
    this.rolFormPermissions = rolFormPermissions;
    console.log(rolFormPermissions)
  })
}
  openFormCreate(): void {
    const dialogRef = this.dialog.open(FormRolFormPermissionComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarrolFormPermissions(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  editrolFormPermissions(rolFormPermissions: any): void {
    // Abre el formulario con los datos del rolFormPermissions
    const dialogRef = this.dialog.open(FormRolFormPermissionComponent, {
      width: '400px',
      data: this.rolFormPermissionseleccionado
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarrolFormPermissions(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  deleterolFormPermissions(rolFormPermissions: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el rolFormPermissions: ${rolFormPermissions.formName} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#765dfb',
      cancelButtonColor: '#d5d7f9',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.apiService.delete('RolFormPermission', rolFormPermissions.id).subscribe(() => {
        this.cargarrolFormPermissions();
       })
      }
    });
  }
}
