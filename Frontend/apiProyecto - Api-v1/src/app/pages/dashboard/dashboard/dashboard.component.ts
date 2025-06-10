import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { AuthService } from '../../../../services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterOutlet, MatSidenavModule, MatListModule, RouterLink, MatButtonModule,  MatCardModule, MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isAdmin = false;
  constructor(private router: Router, public authService: AuthService) {
    this.isAdmin = this.authService.getUserRoles().includes('Admin');
  }

  goToConfig() {
    this.router.navigate(['/config']);
  }
  selectedSection: string = 'cabello';

  onSectionSelected(section: string) {
    this.selectedSection = section;
  }

  isSidenavOpen = false; // Inicialmente el sidenav está cerrado

  // Método para alternar el estado del sidenav
  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }
  logout() {
    this.authService.logout();
  }
}
