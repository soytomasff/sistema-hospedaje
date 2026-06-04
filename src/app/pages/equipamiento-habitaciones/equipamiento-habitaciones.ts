import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipamientoHabitacionService } from '../../services/equipamiento-habitacion.service';

@Component({
  selector: 'app-equipamiento-habitaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipamiento-habitaciones.html',
  styleUrl: './equipamiento-habitaciones.css'
})
export class EquipamientoHabitaciones implements OnInit {

  equipamientos: any[] = [];

  cargando = false;
  mostrarFormulario = false;
  editando = false;

  form = {
    habitacionId: 0,
    tv: 0,
    mesa: 0,
    silla: 0,
    cama: 0,
    controlRemoto: 0,
    frazada: 0,
    sabana: 0,
    toalla: 0,
    cable: false,
    wifi: true,
    duchaCaliente: false,
    tipoBano: 'COMPARTIDO',
    ventilador: false,
    tvSmart: false,
    aireAcondicionado: false,
    observacion: ''
  };

  constructor(private equipamientoService: EquipamientoHabitacionService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.cargando = true;

    this.equipamientoService.listar().subscribe({
      next: (data) => {
        this.equipamientos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar equipamiento:', err);
        this.cargando = false;
      }
    });
  }

  nuevo(): void {
    this.mostrarFormulario = true;
    this.editando = false;

    this.form = {
      habitacionId: 0,
      tv: 1,
      mesa: 1,
      silla: 1,
      cama: 1,
      controlRemoto: 1,
      frazada: 1,
      sabana: 1,
      toalla: 1,
      cable: false,
      wifi: true,
      duchaCaliente: false,
      tipoBano: 'COMPARTIDO',
      ventilador: false,
      tvSmart: false,
      aireAcondicionado: false,
      observacion: 'Nuevo equipamiento'
    };
  }

  editar(item: any): void {
    this.mostrarFormulario = true;
    this.editando = true;

    this.form = {
      habitacionId: item.habitacion_id,
      tv: item.tv,
      mesa: item.mesa,
      silla: item.silla,
      cama: item.cama,
      controlRemoto: item.control_remoto,
      frazada: item.frazada,
      sabana: item.sabana,
      toalla: item.toalla,
      cable: item.cable === 'SI',
      wifi: item.wifi === 'SI',
      duchaCaliente: item.ducha_caliente === 'SI',
      tipoBano: item.tipo_bano,
      ventilador: item.ventilador === 'SI',
      tvSmart: item.tv_smart === 'SI',
      aireAcondicionado: item.aire_acondicionado === 'SI',
      observacion: item.observacion
    };
  }

  guardar(): void {
    if (this.form.habitacionId === 0) {
      alert('Seleccione una habitación');
      return;
    }

    this.equipamientoService.guardar(this.form).subscribe({
      next: () => {
        alert(this.editando ? 'Equipamiento actualizado' : 'Equipamiento guardado');
        this.cancelar();
        this.listar();
      },
      error: (err) => {
        console.error('Error al guardar equipamiento:', err);
        alert('Error al guardar equipamiento');
      }
    });
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;
  }
}