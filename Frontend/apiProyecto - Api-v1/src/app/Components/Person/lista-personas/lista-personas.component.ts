import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../../../services/api.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { FormUserComponent } from '../../User/form-user/form-user.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth-service.service';

@Component({
  selector: 'app-lista-personas',
  imports: [
    MatCardModule,
    CommonModule,
    MatTableModule, MatIconModule, MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule, MatSlideToggleModule],
  templateUrl: './lista-personas.component.html',
  styleUrl: './lista-personas.component.css'
})
export class ListaPersonasComponent {
  person: [] = [];
  personeleccionado?: any;
  nombreuser: String = '';
  filteredperson: any[] = [];
  isAdmin = false;


  displayedColumns: string[] = ['name', 'lastName', 'identification', 'email', 'age', 'actions'];

  constructor(private dialog: MatDialog, private apiService: ApiService, public authService: AuthService) {
    this.isAdmin = this.authService.getUserRoles().includes('Admin');
    if (this.isAdmin) {
      this.displayedColumns.push('status')
    }
  }

  ngOnInit(): void {
    this.cargarperson();
  }
  cargarperson() {
    this.apiService.ObtenerTodo('person').subscribe(person => {
      if (!this.isAdmin) {
        this.person = person.filter((p: any) => p.status === true);
      } else {
        this.person = person;
      }
      console.log(person)
    })
  }
  openFormCreate(): void {
    const dialogRef = this.dialog.open(FormUserComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarperson(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  editperson(person: any): void {
    // Abre el formulario con los datos del person
    const dialogRef = this.dialog.open(FormUserComponent, {
      width: '400px',
      data: this.personeleccionado
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'reload') {
        this.cargarperson(); // Recarga la tabla
        console.log("cargar");
      }
    });
  }

  deleteperson(person: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el person: ${person.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#765dfb',
      cancelButtonColor: '#d5d7f9',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.delete('person', person.id).subscribe(() => {
          this.cargarperson();
        })
      }
    });
  }

  toggleIsActive(person: any) {
    this.apiService.deleteLogic('person', person.id).subscribe(() => {
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
