import { Component } from '@angular/core';
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
export class App {

  usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

  constructor(private router: Router) {}

  cerrarSesion(): void {

    localStorage.removeItem('usuario');

    this.usuario = null;

    this.router.navigate(['/']);

  }

  estaLogeado(): boolean {

    return this.usuario != null;

  }

}