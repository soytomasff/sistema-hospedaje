import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  usuario: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarUsuario();

    if (this.estaLogeado() && this.router.url === '/') {
      this.router.navigate(['/dashboard']);
    }
  }

  cargarUsuario(): void {
    const data = localStorage.getItem('usuario');
    this.usuario = data ? JSON.parse(data) : null;
  }

  estaLogeado(): boolean {
    this.cargarUsuario();
    return this.usuario !== null;
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.usuario = null;
    this.router.navigate(['/']);
  }

}