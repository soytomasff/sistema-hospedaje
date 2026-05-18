import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  usuario = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService
  ) {}

  iniciarSesion(): void {

    this.authService.login(this.usuario).subscribe({

      next: (res) => {

        // GUARDAR USUARIO
        localStorage.setItem(
          'usuario',
          JSON.stringify(res)
        );

        alert('Bienvenido');

        // RECARGAR Y ENTRAR AL PANEL
        window.location.href = '/dashboard';

      },

      error: () => {

        alert('Usuario o contraseña incorrectos');

      }

    });

  }

}