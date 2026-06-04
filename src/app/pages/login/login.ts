import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {

  usuario = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
      this.router.navigate(['/dashboard']);
    }
  }

  iniciarSesion(): void {

    this.authService.login(this.usuario).subscribe({

      next: (res) => {

        localStorage.setItem('usuario', JSON.stringify(res));

        alert('Bienvenido');

        this.router.navigate(['/dashboard']);

      },

      error: () => {
        alert('Usuario o contraseña incorrectos');
      }

    });

  }

}