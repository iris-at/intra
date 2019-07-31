import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

//Servicios
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styles: []
})
export class ConsultasComponent implements OnInit {

  @ViewChild('folio') input: ElementRef;

  fecha: string;
  hora: string;
  id: number;
  img: string;
  lugar: string;
  nombre: string = '';
  partidas: number;
  pedido: number;
  serie: string;
  ultimapartidas: number;
  ultimopedido: string;

  lineChartData: Array<any> = [ ];

  lineChartLabels: Array<any> = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  lineChartOptions: any = {
    responsive: true,
  };

  constructor(
    private pedidosService: PedidosService
  ) { }

  ngOnInit() {
  }

  buscador() {
    this.fecha = '';
    this.hora = '';
    this.id = 0 ;
    this.img = '';
    this.lugar = '';
    this.nombre = '';
    this.partidas = 0;
    this.pedido = 0;
    this.serie = '';
    this.ultimapartidas = 0;
    this.ultimopedido = '';
    const folio = this.input.nativeElement.value;
    const buscar = folio.split('-');
    this.lineChartData = [];

    this.pedidosService.buscarFolio(buscar[1], buscar[0]).subscribe((resp: any) => {
      if (resp.length > 0){
        this.fecha = resp[0].fecha;
        this.hora = resp[0].hora;
        this.id = resp[0].id;
        this.img = resp[0].img;
        this.lugar = resp[0].lugar === 'al' ? 'Almacén' : 'Cuarto Chico';
        this.nombre = resp[0].nombre;
        this.partidas = resp[0].partidas;
        this.pedido = resp[0].pedido;
        this.serie = resp[0].serie;
        this.ultimapartidas = resp[0].ultimapartidas;
        this.ultimopedido = resp[0].ultimopedido;
        if (this.id !== 0) {
          this.pedidosService.buscarIdGrafica(this.id).subscribe((dato: any) => {
            for (const alm of dato) {
              let esAlmacenista = (a: any) => {
                return a.label === alm.nombre;
              };
              if (this.lineChartData.find(esAlmacenista)) {
                switch (alm.hora) {
                  case 9:
                    this.lineChartData.find(esAlmacenista).data[0] = alm.pedidos;
                    break;
                  case 10:
                    this.lineChartData.find(esAlmacenista).data[1] = alm.pedidos;
                    break;
                  case 11:
                    this.lineChartData.find(esAlmacenista).data[2] = alm.pedidos;
                    break;
                  case 12:
                    this.lineChartData.find(esAlmacenista).data[3] = alm.pedidos;
                    break;
                  case 13:
                    this.lineChartData.find(esAlmacenista).data[4] = alm.pedidos;
                    break;
                  case 14:
                    this.lineChartData.find(esAlmacenista).data[5] = alm.pedidos;
                    break;
                  case 15:
                    this.lineChartData.find(esAlmacenista).data[6] = alm.pedidos;
                    break;
                  case 16:
                    this.lineChartData.find(esAlmacenista).data[7] = alm.pedidos;
                    break;
                  case 17:
                    this.lineChartData.find(esAlmacenista).data[8] = alm.pedidos;
                    break;
                  case 18:
                    this.lineChartData.find(esAlmacenista).data[9] = alm.pedidos;
                    break;
                  case 19:
                    this.lineChartData.find(esAlmacenista).data[10] = alm.pedidos;
                    break;
                  case 20:
                    this.lineChartData.find(esAlmacenista).data[11] = alm.pedidos;
                    break;
                }
              } else {
                const datos = {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: alm.nombre};
                switch (alm.hora) {
                  case 9:
                    datos.data[0] = alm.pedidos;
                    break;
                  case 10:
                    datos.data[1] = alm.pedidos;
                    break;
                  case 11:
                    datos.data[2] = alm.pedidos;
                    break;
                  case 12:
                    datos.data[3] = alm.pedidos;
                    break;
                  case 13:
                    datos.data[4] = alm.pedidos;
                    break;
                  case 14:
                    datos.data[5] = alm.pedidos;
                    break;
                  case 15:
                    datos.data[6] = alm.pedidos;
                    break;
                  case 16:
                    datos.data[7] = alm.pedidos;
                    break;
                  case 17:
                    datos.data[8] = alm.pedidos;
                    break;
                  case 18:
                    datos.data[9] = alm.pedidos;
                    break;
                  case 19:
                    datos.data[10] = alm.pedidos;
                    break;
                  case 20:
                    datos.data[11] = alm.pedidos;
                    break;
                }
                this.lineChartData.push(datos);
              }
            }
            this.input.nativeElement.value = '';
          });
        }
      }
    });
  }
}
