import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CajaDiariaService } from '../../services/caja-diaria.service';

@Component({
  selector: 'app-caja-diaria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './caja-diaria.html',
  styleUrl: './caja-diaria.css'
})
export class CajaDiaria implements OnInit {

  fechaSeleccionada: string = this.fechaHoy();

  movimientos: any[] = [];
  porMetodo: any[] = [];

  resumen: any = {
    totalHospedaje: 0,
    totalVitrina: 0,
    totalIngresos: 0,
    totalEgresos: 0,
    totalDia: 0,
    efectivo: 0,
    yape: 0,
    plin: 0,
    tarjeta: 0,
    transferencia: 0,
    cerrado: false
  };

  egreso = {
    descripcion: '',
    metodoPago: 'EFECTIVO',
    monto: 0,
    observacion: ''
  };

  cargando = false;

  constructor(private cajaService: CajaDiariaService) {}

  ngOnInit(): void {
    this.cargarCaja();
  }

  fechaHoy(): string {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }

  cargarCaja(): void {
    this.cargando = true;

    this.cajaService.obtenerCaja(this.fechaSeleccionada).subscribe({
      next: (data) => {
        this.movimientos = data.movimientos || [];
        this.porMetodo = data.porMetodo || [];

        this.resumen = {
          totalHospedaje: data.resumen?.totalHospedaje || 0,
          totalVitrina: data.resumen?.totalVitrina || 0,
          totalIngresos: data.resumen?.totalIngresos || 0,
          totalEgresos: data.resumen?.totalEgresos || 0,
          totalDia: data.resumen?.totalDia || 0,
          efectivo: data.resumen?.efectivo || 0,
          yape: data.resumen?.yape || 0,
          plin: data.resumen?.plin || 0,
          tarjeta: data.resumen?.tarjeta || 0,
          transferencia: data.resumen?.transferencia || 0,
          cerrado: data.resumen?.cerrado || false
        };

        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar caja diaria:', err);
        alert('Error al cargar caja diaria');
        this.cargando = false;
      }
    });
  }

  registrarEgreso(): void {
    if (this.resumen.cerrado) {
      alert('La caja ya está cerrada');
      return;
    }

    if (!this.egreso.descripcion.trim()) {
      alert('Ingrese una descripción del egreso');
      return;
    }

    if (!this.egreso.monto || this.egreso.monto <= 0) {
      alert('Ingrese un monto válido');
      return;
    }

    const data = {
      fecha: this.fechaSeleccionada,
      descripcion: this.egreso.descripcion,
      metodoPago: this.egreso.metodoPago,
      monto: this.egreso.monto,
      observacion: this.egreso.observacion
    };

    this.cajaService.registrarEgreso(data).subscribe({
      next: () => {
        alert('Egreso registrado correctamente');

        this.egreso = {
          descripcion: '',
          metodoPago: 'EFECTIVO',
          monto: 0,
          observacion: ''
        };

        this.cargarCaja();
      },
      error: (err) => {
        console.error('Error al registrar egreso:', err);
        alert(err.error?.message || 'Error al registrar egreso');
      }
    });
  }

  cerrarCaja(): void {
    if (this.resumen.cerrado) {
      alert('Esta caja ya está cerrada');
      return;
    }

    const confirmar = confirm(
      `¿Seguro que deseas cerrar la caja del ${this.fechaSeleccionada}?`
    );

    if (!confirmar) {
      return;
    }

    this.cajaService.cerrarCaja(this.fechaSeleccionada, 'admin').subscribe({
      next: () => {
        alert('Caja cerrada correctamente');
        this.cargarCaja();
      },
      error: (err) => {
        console.error('Error al cerrar caja:', err);
        alert('Error al cerrar caja');
      }
    });
  }

  imprimirCierre(): void {
    const ventana = window.open('', '_blank', 'width=900,height=700');

    if (!ventana) {
      alert('No se pudo abrir la ventana de impresión');
      return;
    }

    const filas = this.movimientos.map(m => `
      <tr>
        <td>${m.hora || ''}</td>
        <td>${m.tipo || ''}</td>
        <td>${m.habitacion || ''}</td>
        <td>${m.detalle || ''}</td>
        <td>${m.metodoPago || ''}</td>
        <td>S/ ${this.moneda(m.ingreso)}</td>
        <td>S/ ${this.moneda(m.egreso)}</td>
        <td>${m.observacion || ''}</td>
      </tr>
    `).join('');

    ventana.document.write(`
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Caja Diaria ${this.fechaSeleccionada}</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 25px;
              color: #000;
              background: white;
            }

            h2 {
              text-align: center;
              margin-bottom: 5px;
            }

            .fecha {
              text-align: center;
              margin-bottom: 25px;
              font-weight: bold;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }

            th, td {
              border: 1px solid #333;
              padding: 8px;
              font-size: 13px;
              text-align: center;
            }

            th {
              background: #e5e7eb;
            }

            .resumen {
              width: 360px;
              margin-left: auto;
              border: 1px solid #333;
              padding: 15px;
            }

            .fila {
              display: flex;
              justify-content: space-between;
              padding: 6px 0;
              border-bottom: 1px dashed #999;
            }

            .total {
              font-size: 18px;
              font-weight: bold;
              margin-top: 10px;
            }

            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
            }

            @page {
              size: A4;
              margin: 12mm;
            }
          </style>
        </head>

        <body>

          <h2>HOSPEDAJE AMAUTA</h2>

          <div class="fecha">
            CIERRE DE CAJA - ${this.fechaSeleccionada}
          </div>

          <table>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Tipo</th>
                <th>Habitación</th>
                <th>Detalle</th>
                <th>Método</th>
                <th>Ingreso</th>
                <th>Egreso</th>
                <th>Observación</th>
              </tr>
            </thead>

            <tbody>
              ${filas}
            </tbody>
          </table>

          <div class="resumen">

            <div class="fila">
              <span>Total hospedaje:</span>
              <strong>S/ ${this.moneda(this.resumen.totalHospedaje)}</strong>
            </div>

            <div class="fila">
              <span>Total vitrina:</span>
              <strong>S/ ${this.moneda(this.resumen.totalVitrina)}</strong>
            </div>

            <div class="fila">
              <span>Total ingresos:</span>
              <strong>S/ ${this.moneda(this.resumen.totalIngresos)}</strong>
            </div>

            <div class="fila">
              <span>Total egresos:</span>
              <strong>S/ ${this.moneda(this.resumen.totalEgresos)}</strong>
            </div>

            <div class="fila total">
              <span>Total del día:</span>
              <strong>S/ ${this.moneda(this.resumen.totalDia)}</strong>
            </div>

          </div>

          <div class="footer">
            Sistema de Gestión Hotelera - Hospedaje Amauta
          </div>

        </body>
      </html>
    `);

    ventana.document.close();

    setTimeout(() => {
      ventana.print();
      ventana.close();
    }, 500);
  }

  moneda(valor: any): string {
    return Number(valor || 0).toFixed(2);
  }
}