import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../../../../services/api.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../services/auth-service.service';

declare const google: any;

@Component({
  selector: 'app-started',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  templateUrl: './started.component.html',
  styleUrl: './started.component.css',
  animations: [
    trigger('iconExpand', [
      state('initial', style({ transform: 'scale(0.2)', opacity: 0 })),
      state('expanded', style({ transform: 'scale(1)', opacity: 1 })),
      transition('initial => expanded', animate('500ms ease-out'))
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5)' }),
        animate('600ms 300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class StartedComponent {
  loginForm: FormGroup;
  iconState: 'initial' | 'expanded' = 'initial';
  showExtras = false;
  private googleCodeClient: any;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [
        Validators.required,
        // Validators.minLength(6),
        // Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      ]]
    });
  }

  ngOnInit(): void {
    this.startAnimations();
    const code = this.route.snapshot.queryParamMap.get('code');
  
  // Si el código está presente, llama al método handleCredentialResponse
  if (code) {
    this.handleCredentialResponse(code);
  } else {
    // Si no hay código, no hace nada o maneja el error
    console.log('No se encontró código de autenticación en la URL');
  }
  }

  startAnimations(): void {
    setTimeout(() => {
      this.iconState = 'expanded';
      setTimeout(() => {
        this.showExtras = true;
        this.loadGoogleButton(); // Google solo se carga después de mostrar extras
      }, 200);
    }, 500);
  }

  loadGoogleButton(): void {
    const checkGoogleLoaded = () => {
      if ((window as any).google) {
        this.googleCodeClient = google.accounts.oauth2.initCodeClient({
          client_id: '140227784056-arlnkaj5j7frl6k3uku5ft0e178dq42m.apps.googleusercontent.com',
          scope: 'openid email profile',
          redirect_uri: 'http://localhost:4200',
          ux_mode: 'redirect',
          callback: () => { } // No necesario en redirect, pero puede usarse en popup
        });
      } else {
        setTimeout(checkGoogleLoaded, 100);
      }
    };

    checkGoogleLoaded();
  }


  handleCredentialResponse(code: string) {
    if (code) {
      this.api.exchangeCodeForToken(code).subscribe({
        next: res => {
          // Guarda el token JWT en el localStorage
          localStorage.setItem('jwt', res.token);

          // Notifica al usuario que la autenticación fue exitosa
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 1500
          });

          // Redirige a la página de Dashboard
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          // Si hay un error, muestra el mensaje adecuado
          Swal.fire('Error', 'Login con Google falló', 'error');
        }
      });
    } else {
      // Si no hay código en la URL, muestra un error
      Swal.fire('Error', 'No se encontró código de autenticación en la URL', 'warning');
    }
  }

  onGoogleLogin(): void {
    if (this.googleCodeClient) {
      this.googleCodeClient.requestCode(); // Solo redirige al hacer clic
    } else {
      Swal.fire('Espera', 'Google aún se está cargando. Intenta en unos segundos.', 'info');
    }
  }
  login() {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value;

    this.api.login(credentials).subscribe({
      next: (data) => {
        const token = data.token;
        this.authService.setToken(token)
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500
        });

        var roles = this.authService.getUserRoles();
        console.log(roles)
        if (roles.includes('Admin')) {
          console.log('Es admin');
        } else {
          console.log('No es admin');
        }
        this.router.navigate(['/dashboard'])

      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: 'Usuario o contraseña incorrectos'
        });
      }
    });
  }

}
