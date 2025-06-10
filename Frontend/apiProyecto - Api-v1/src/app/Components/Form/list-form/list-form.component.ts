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
import { FormFormComponent } from '../form-form/form-form.component';
import { CommonModule } from '@angular/common';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AuthService } from '../../../../services/auth-service.service';

@Component({
  selector: 'app-list-form',
  imports: [CommonModule, MatSlideToggle, MatCardModule, MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './list-form.component.html',
  styleUrl: './list-form.component.css'
})
export class ListFormComponent {
  forms: [] = [];
  formseleccionado?: any;
  nombreuser: String = '';
  filteredforms: any[] = [];
  isAdmin = false;

  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(private dialog: MatDialog, private apiService: ApiService, private authService: AuthService) {
    this.isAdmin = this.authService.getUserRoles().includes('Admin');
    if (this.isAdmin) {
      this.displayedColumns.push('status')
    }
   }

  ngOnInit(): void {
    this.cargarforms();
  }
cargarforms(){
  this.apiService.ObtenerTodo('form').subscribe(forms => {
    if (!this.isAdmin) {
      this.forms = forms.filter((f: any) => f.status === true || f.status === 1);
    } else {
      this.forms = forms;
    }
  })
}
  openFormCreate(): void {
    const dialogRef = this.dialog.open(FormFormComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarforms(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  editforms(forms: any): void {
    // Abre el formulario con los datos del forms
    const dialogRef = this.dialog.open(FormFormComponent, {
      width: '400px',
      data: this.formseleccionado
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarforms(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  deleteforms(forms: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el forms: ${forms.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#765dfb',
      cancelButtonColor: '#d5d7f9',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       this.apiService.delete('form', forms.id).subscribe(() => {
        this.cargarforms();
       })
      }
    });
  }

  toggleIsActive(form : any){
    this.apiService.deleteLogic('form', form.id).subscribe(() => {
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
