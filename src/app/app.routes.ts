import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';

import { DashboardComponent } from './pages/dashboard/dashboard';
import { HuespedesComponent } from './pages/huespedes/huespedes';
import { HabitacionesComponent } from './pages/habitaciones/habitaciones';
import { RegistrosComponent } from './pages/registros/registros';
import { ProductosComponent } from './pages/productos/productos';
import { ReservasComponent } from './pages/reservas/reservas';

import { Ventas } from './pages/ventas/ventas';
import { BoletasComponent } from './pages/boletas/boletas';
import { Movimientos } from './pages/movimientos/movimientos';
import { StockUbicacion } from './pages/stock-ubicacion/stock-ubicacion';
import { EquipamientoHabitaciones } from './pages/equipamiento-habitaciones/equipamiento-habitaciones';
import { CajaDiaria } from './pages/caja-diaria/caja-diaria';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'huespedes',
    component: HuespedesComponent,
    canActivate: [authGuard]
  },

  {
    path: 'habitaciones',
    component: HabitacionesComponent,
    canActivate: [authGuard]
  },

  {
    path: 'equipamiento-habitaciones',
    component: EquipamientoHabitaciones,
    canActivate: [authGuard]
  },

  {
    path: 'reservas',
    component: ReservasComponent,
    canActivate: [authGuard]
  },

  {
    path: 'registros',
    component: RegistrosComponent,
    canActivate: [authGuard]
  },

  {
    path: 'boletas',
    component: BoletasComponent,
    canActivate: [authGuard]
  },

  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [authGuard]
  },

  {
    path: 'stock-ubicacion',
    component: StockUbicacion,
    canActivate: [authGuard]
  },

  {
    path: 'ventas',
    component: Ventas,
    canActivate: [authGuard]
  },

  {
    path: 'movimientos',
    component: Movimientos,
    canActivate: [authGuard]
  },

  {
    path: 'caja-diaria',
    component: CajaDiaria,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: ''
  }

];