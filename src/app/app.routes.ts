import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';

import { DashboardComponent } from './pages/dashboard/dashboard';
import { HuespedesComponent } from './pages/huespedes/huespedes';
import { HabitacionesComponent } from './pages/habitaciones/habitaciones';
import { RegistrosComponent } from './pages/registros/registros';
import { ProductosComponent } from './pages/productos/productos';

// 🔥 GUARD
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  // LOGIN
  {
    path: '',
    component: LoginComponent
  },

  // DASHBOARD
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  // HUESPEDES
  {
    path: 'huespedes',
    component: HuespedesComponent,
    canActivate: [authGuard]
  },

  // HABITACIONES
  {
    path: 'habitaciones',
    component: HabitacionesComponent,
    canActivate: [authGuard]
  },

  // REGISTROS
  {
    path: 'registros',
    component: RegistrosComponent,
    canActivate: [authGuard]
  },

  // PRODUCTOS
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [authGuard]
  },

  // RUTA NO ENCONTRADA
  {
    path: '**',
    redirectTo: ''
  }

];