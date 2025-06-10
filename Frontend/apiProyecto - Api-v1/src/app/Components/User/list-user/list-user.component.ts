import { Component } from '@angular/core';
import { FormUserComponent } from '../form-user/form-user.component';
import { ApiService } from '../../../../services/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AuthService } from '../../../../services/auth-service.service';


@Component({
  selector: 'app-list-user',
  imports: [CommonModule,MatSlideToggle, MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent {
  users: [] = [];
  userSeleccionado?: any;
  nombreuser: String = '';
  filteredusers: any[] = [];
  isAdmin = false;

  displayedColumns: string[] = ['userName', 'personId', 'actions'];

  constructor(private dialog: MatDialog, private apiService: ApiService, private authService: AuthService) { 
    this.isAdmin = this.authService.getUserRoles().includes('Admin');
    if (this.isAdmin) {
      this.displayedColumns.push('status')
    }
  }

  ngOnInit(): void {
    this.cargarusers();
  }
cargarusers(){
  this.apiService.ObtenerTodo('User').subscribe(users => {
    this.users = users;
    console.log(users)
  })
}
  openFormCreate(): void {
    const dialogRef = this.dialog.open(FormUserComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarusers(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  editusers(users: any): void {
    // Abre el formulario con los datos del users
    const dialogRef = this.dialog.open(FormUserComponent, {
      width: '400px',
      data: this.userSeleccionado
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarusers(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  deleteusers(users: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el users: ${users.userName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#765dfb',
      cancelButtonColor: '#d5d7f9',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.apiService.delete('branchs', users.idBranch).subscribe(() => {
        this.cargarusers();
       })
      }
    });
  }
  toggleIsActive(user : any){
    this.apiService.deleteLogic('Users', user.id).subscribe(() => {
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
