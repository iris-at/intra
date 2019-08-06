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
  @ViewChild('user') user: ElementRef;

  folios: any[] = [];

  totalPedidos: any[] = [];
  lista: any[] = [];
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
  seccion: string;
  id_user: number;
 

  lineChartData: Array<any> = [ ];

  lineChartLabels: Array<any> = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  lineChartOptions: any = {
    responsive: true,
  };

  constructor(
    private pedidosService: PedidosService
  ) {
    this.almacenistas();
  }
  
  ngOnInit() {
  }

  buscador() {
    this.limpiando();
    const folio = this.input.nativeElement.value;
    const buscar = folio.split('-');

    this.pedidosService.buscarFolio(buscar[1], buscar[0]).subscribe((resp: any) => {
      if (resp.length > 0) {
        let array = [];
        this.folios = resp;
        for (const g of resp) {
          this.pedidosService.buscarIdGrafica(g.id).subscribe((dato: any) => {
            for (const alm of dato) {
              let esAlmacenista = (a: any) => {
                return a.label === alm.nombre;
              };
              if (array.find(esAlmacenista)) {
                switch (alm.hora) {
                  case 9:
                    array.find(esAlmacenista).data[0] = alm.pedidos;
                    break;
                  case 10:
                    array.find(esAlmacenista).data[1] = alm.pedidos;
                    break;
                  case 11:
                    array.find(esAlmacenista).data[2] = alm.pedidos;
                    break;
                  case 12:
                    array.find(esAlmacenista).data[3] = alm.pedidos;
                    break;
                  case 13:
                    array.find(esAlmacenista).data[4] = alm.pedidos;
                    break;
                  case 14:
                    array.find(esAlmacenista).data[5] = alm.pedidos;
                    break;
                  case 15:
                    array.find(esAlmacenista).data[6] = alm.pedidos;
                    break;
                  case 16:
                    array.find(esAlmacenista).data[7] = alm.pedidos;
                    break;
                  case 17:
                    array.find(esAlmacenista).data[8] = alm.pedidos;
                    break;
                  case 18:
                    array.find(esAlmacenista).data[9] = alm.pedidos;
                    break;
                  case 19:
                    array.find(esAlmacenista).data[10] = alm.pedidos;
                    break;
                  case 20:
                    array.find(esAlmacenista).data[11] = alm.pedidos;
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
                array.push(datos);
              }
            }
          });
        }
        setTimeout(() => {
          this.lineChartData = array;
        }, 1000);
        this.input.nativeElement.value = '';
      }
    });
  }

  almacenistas(){
    this.pedidosService.totalAlmacenistas().subscribe((dat: any) => {
      this.lista = [];
      if(dat.length > 0){
        for(let i=0; i<dat.length; i++){
          const res = {
            id: dat[i].id,
            nombres: dat[i].nombre,
          }
          this.lista.push(res);
        }
      }
    });
  }

  limpiando() {
    this.folios = [];
    this.lineChartData = [];
    this.totalPedidos = [];
    this.fecha = '';
    this.id = 0;
    this.img = '';
    this.seccion = '';
    this.nombre = '';
    this.ultimapartidas = 0;
    this.ultimopedido = '';
  }
  
  pedidosUsuario(){
    this.limpiando();
    const usuario = this.user.nativeElement.value;
    this.pedidosService.obtenerInfoId(usuario).subscribe((info: any) => {
      if(info.length > 0) {
        this.fecha = info[0].fecha;
        this.id = info[0].id;
        this.img = info[0].img;
        this.seccion = info[0].seccion;
        this.nombre = info[0].nombre;
        this.ultimapartidas = info[0].ultimapartidas;
        this.ultimopedido = info[0].ultimopedido;
        this.pedidosService.obtenerPedidosId(usuario).subscribe((info2: any) => {
          if(info2.length > 0) {
            this.totalPedidos = info2;
            this.pedidosService.buscarIdGrafica(usuario).subscribe((dato: any) => {
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
            });
          }

        });
      }
      this.user.nativeElement.value = '';
    });
  }
}
