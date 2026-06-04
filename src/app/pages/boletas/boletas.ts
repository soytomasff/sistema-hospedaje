import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegistroService } from '../../services/registro.service';
import { BoletaHospedajeService } from '../../services/boleta-hospedaje.service';

@Component({
  selector: 'app-boletas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './boletas.html',
  styleUrl: './boletas.css'
})
export class BoletasComponent implements OnInit {

  registros: any[] = [];
  boletas: any[] = [];

  boletaRequest = {
    registroId: 0,
    metodoPago: 'EFECTIVO'
  };

  constructor(
    private registroService: RegistroService,
    private boletaService: BoletaHospedajeService
  ) {}

  ngOnInit(): void {
    this.listarRegistros();
    this.listarBoletas();
  }

  listarRegistros(): void {
    this.registroService.listar().subscribe({
      next: (data) => {
        this.registros = data;
      },
      error: (err) => {
        console.error('Error al cargar registros:', err);
      }
    });
  }

  listarBoletas(): void {
    this.boletaService.listar().subscribe({
      next: (data) => {
        this.boletas = data;
      },
      error: (err) => {
        console.error('Error al cargar boletas:', err);
      }
    });
  }

  generarBoleta(): void {
    if (this.boletaRequest.registroId === 0) {
      alert('Seleccione un registro');
      return;
    }

    this.boletaService.generar(this.boletaRequest).subscribe({
      next: () => {
        alert('Boleta generada correctamente');

        this.boletaRequest = {
          registroId: 0,
          metodoPago: 'EFECTIVO'
        };

        this.listarBoletas();
      },
      error: (err) => {
        console.error('Error al generar boleta:', err);
        alert(err.error?.message || 'Error al generar boleta');
      }
    });
  }

  formatoBoleta(boleta: any): string {
    const numero = String(boleta.numero).padStart(6, '0');
    return `${boleta.serie}-${numero}`;
  }

  moneda(valor: any): string {
    const numero = Number(valor || 0);
    return numero.toFixed(2);
  }

  imprimirBoleta(boleta: any): void {
    const numeroBoleta = this.formatoBoleta(boleta);

    const ventana = window.open('', '_blank', 'width=450,height=700');

    if (!ventana) {
      alert('No se pudo abrir la ventana de impresión');
      return;
    }

    ventana.document.write(`
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${numeroBoleta}</title>

          <style>
            body {
              font-family: Arial, sans-serif;
              color: #000;
              padding: 20px;
              background: white;
            }

            .boleta {
              width: 100%;
              max-width: 380px;
              margin: auto;
              border: 1px solid #000;
              padding: 18px;
            }

            h2 {
              text-align: center;
              margin: 0;
              font-size: 20px;
            }

            .subtitulo {
              text-align: center;
              font-size: 13px;
              margin-top: 5px;
              margin-bottom: 15px;
            }

            .numero {
              text-align: center;
              font-weight: bold;
              margin-bottom: 18px;
              font-size: 16px;
            }

            .fila {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px dashed #999;
              padding: 7px 0;
              font-size: 14px;
              gap: 10px;
            }

            .fila strong {
              width: 45%;
            }

            .fila span {
              width: 55%;
              text-align: right;
            }

            .total {
              margin-top: 15px;
              padding: 12px;
              border: 1px solid #000;
              text-align: center;
              font-size: 18px;
              font-weight: bold;
            }

            .footer {
              text-align: center;
              margin-top: 18px;
              font-size: 12px;
            }

            @page {
              size: A5;
              margin: 10mm;
            }
          </style>
        </head>

        <body>
          <div class="boleta">

            <h2>HOSPEDAJE AMAUTA</h2>
            <div class="subtitulo">BOLETA DE HOSPEDAJE</div>

            <div class="numero">${numeroBoleta}</div>

            <div class="fila">
              <strong>Huésped:</strong>
              <span>${boleta.nombreHuesped || ''}</span>
            </div>

            <div class="fila">
              <strong>DNI:</strong>
              <span>${boleta.dni || ''}</span>
            </div>

            <div class="fila">
              <strong>Habitación:</strong>
              <span>${boleta.numeroHabitacion || ''}</span>
            </div>

            <div class="fila">
              <strong>Ingreso:</strong>
              <span>${boleta.fechaIngreso || ''}</span>
            </div>

            <div class="fila">
              <strong>Salida:</strong>
              <span>${boleta.fechaSalida || ''}</span>
            </div>

            <div class="fila">
              <strong>Noches:</strong>
              <span>${boleta.noches || 0}</span>
            </div>

            <div class="fila">
              <strong>Precio noche:</strong>
              <span>S/ ${this.moneda(boleta.precioNoche)}</span>
            </div>

            <div class="fila">
              <strong>Método pago:</strong>
              <span>${boleta.metodoPago || ''}</span>
            </div>

            <div class="fila">
              <strong>Estado:</strong>
              <span>${boleta.estado || ''}</span>
            </div>

            <div class="total">
              TOTAL PAGADO: S/ ${this.moneda(boleta.total)}
            </div>

            <div class="footer">
              Gracias por su preferencia
            </div>

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
}