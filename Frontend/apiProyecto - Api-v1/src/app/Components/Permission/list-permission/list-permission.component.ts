import { Component } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { FormPermissionComponent } from '../form-permission/form-permission.component';
import { CommonModule } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AuthService } from '../../../../services/auth-service.service';

@Component({
  selector: 'app-list-permission',
  imports: [CommonModule, MatSlideToggle, MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './list-permission.component.html',
  styleUrl: './list-permission.component.css'
})
export class ListPermissionComponent {
  permissions: [] = [];
  permissionseleccionado?: any;
  nombreuser: String = '';
  filteredpermissions: any[] = [];
  isAdmin = false;

  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(private dialog: MatDialog, private apiService: ApiService, private authService: AuthService) {
    this.isAdmin = this.authService.getUserRoles().includes('Admin');
    if (this.isAdmin) {
      this.displayedColumns.push('status')
    }
   }

  ngOnInit(): void {
    this.cargarpermissions();
  }
cargarpermissions(){
  this.apiService.ObtenerTodo('permission').subscribe(permissions => {
    this.permissions = permissions;
    console.log(permissions)
  })
}
  openFormCreate(): void {
    const dialogRef = this.dialog.open(FormPermissionComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarpermissions(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  editpermissions(permissions: any): void {
    // Abre el formulario con los datos del permissions
    const dialogRef = this.dialog.open(FormPermissionComponent, {
      width: '400px',
      data: this.permissionseleccionado
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarpermissions(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  deletepermissions(permissions: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el permissions: ${permissions.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#765dfb',
      cancelButtonColor: '#d5d7f9',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.apiService.delete('permission', permissions.id).subscribe(() => {
        this.cargarpermissions();
       })
      }
    });
  }

  toggleIsActive(permission : any){
    this.apiService.deleteLogic('permission', permission.id).subscribe(() => {
      Swal.fire({
        title: `Actualización exitosa`,
        icon: 'success',
        confirmButtonColor: '#765dfb',
        cancelButtonColor: '#d5d7f9',
        confirmButtonText: 'Aceptar',
      })
    });
  }
}
