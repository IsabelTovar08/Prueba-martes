import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../services/api.service';
import { FormUserComponent } from '../../User/form-user/form-user.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormUserRolComponent } from '../form-user-rol/form-user-rol.component';

@Component({
  selector: 'app-list-user-rol',
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './list-user-rol.component.html',
  styleUrl: './list-user-rol.component.css'
})
export class ListUserRolComponent {
  userRoles: [] = [];
  userRoleseleccionado?: any;
  nombreuser: String = '';
  filtereduserRoles: any[] = [];


  displayedColumns: string[] = ['rolName', 'userName', 'actions'];

  constructor(private dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargaruserRoles();
  }
cargaruserRoles(){
  this.apiService.ObtenerTodo('userRol').subscribe(userRoles => {
    this.userRoles = userRoles;
    console.log(userRoles)
  })
}
  openFormCreate(): void {
    const dialogRef = this.dialog.open(FormUserRolComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargaruserRoles(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  edituserRoles(userRoles: any): void {
    // Abre el formulario con los datos del userRoles
    const dialogRef = this.dialog.open(FormUserRolComponent, {
      width: '400px',
      data: this.userRoleseleccionado
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargaruserRoles(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  deleteuserRoles(userRoles: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el userRoles: ${userRoles.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#765dfb',
      cancelButtonColor: '#d5d7f9',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.apiService.delete('userRol', userRoles.id).subscribe(() => {
        this.cargaruserRoles();
       })
      }
    });
  }
}
