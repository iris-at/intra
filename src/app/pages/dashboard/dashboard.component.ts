import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';

//Servicios
import { HerramientasService } from 'src/app/services/herramientas/herramientas.service';
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  pedidos: any[] = [];
  partidas: any[] = [];
  mejor: any;
  nombre: string;
  pedido: number;
  partida: number;
  foto: string = '';
  
  partidasTotal: number;
  pedidosTotal: number;

  //Observables
  obsevando: Subscription;
  intervalo: any;

  lineChartData: Array<any> = [];

  lineChartLabels: Array<any> = ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  lineChartOptions: any = {
    responsive: true,
  };

  constructor(
    public herramientasService: HerramientasService,
    private pedidosService: PedidosService
  ) { 
    this.obtenerPedidos();
    this.obtenerPartidas();
    this.obtenerPartidasTotales();
    this.obtenerPedidosTotales();
    this.obtenerPedidosGlobales();
    this.obsevando = this.regresa().subscribe((resp: any) => {});
  }

  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.obsevando.unsubscribe();
    clearInterval(this.intervalo);
  }

  obtenerPedidos(){
    this.pedidosService.pedidosHora(this.herramientasService.horaActualDigito()).subscribe((resp: any) => {
      this.pedidos = resp;
    });
  }

  obtenerPartidas(){
    this.pedidosService.partidasHora(this.herramientasService.horaActualDigito()).subscribe((resp: any) => {
      this.partidas = resp;
      this.nombre = resp[0].nombre;
      this.foto = resp[0].img;
      this.pedido = resp[0].pedidos;
      this.partida = resp[0].cantidad;
    });
  }

  obtenerPartidasTotales(){
    this.pedidosService.partidasTotal(this.herramientasService.horaActualDigito()).subscribe((resp: any) => {
      this.partidasTotal = resp[0].total;
    });
  }

  obtenerPedidosTotales(){
    this.pedidosService.pedidosTotal(this.herramientasService.horaActualDigito()).subscribe((resp: any) => {
      this.pedidosTotal = resp[0].total;
    });
  }

  obtenerPedidosGlobales(){
    this.pedidosService.pedidosGlobal().subscribe((resp: any) => {
      this.lineChartData = [];
      for (const alm of resp) {
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
          const dato = {data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: alm.nombre};
          switch (alm.hora) {
            case 9:
              dato.data[0] = alm.pedidos;
              break;
            case 10:
              dato.data[1] = alm.pedidos;
              break;
            case 11:
              dato.data[2] = alm.pedidos;
              break;
            case 12:
              dato.data[3] = alm.pedidos;
              break;
            case 13:
              dato.data[4] = alm.pedidos;
              break;
            case 14:
              dato.data[5] = alm.pedidos;
              break;
            case 15:
              dato.data[6] = alm.pedidos;
              break;
            case 16:
              dato.data[7] = alm.pedidos;
              break;
            case 17:
              dato.data[8] = alm.pedidos;
              break;
            case 18:
              dato.data[9] = alm.pedidos;
              break;
            case 19:
              dato.data[10] = alm.pedidos;
              break;
            case 20:
              dato.data[11] = alm.pedidos;
              break;
          }
          setTimeout(() => {
          }, 500);
          this.lineChartData.push(dato);
        }
      }
    });
  }

  regresa(): Observable<any> {

    return new Observable((observer: Subscriber<any>) => {

      this.intervalo = setInterval( () => {
        this.obtenerPedidosGlobales();
        this.obtenerPedidos();
        this.obtenerPartidas();
        this.obtenerPartidasTotales();
        this.obtenerPedidosTotales();

      }, 5000);

    });

  }
}
