import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//CONFIGURACION
import { URL_EXTERNO, PUERTO_SERVER } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  url: string;

  constructor(
    private http: HttpClient
  ) {

  }

  pedidosHora(hora: any){
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=4&hora=' + hora;
    return this.http.get(this.url);
  }

  partidasHora(hora: any){
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=5&hora=' + hora;
    return this.http.get(this.url);
  }

  partidasTotal(hora: any){
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=7&hora=' + hora;
    return this.http.get(this.url);
  }

  pedidosTotal(hora: any){
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=8&hora=' + hora;
    return this.http.get(this.url);
  }

  totalAlmacenistas(){
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=9';
    return this.http.get(this.url);
  }

  pedidosGlobal(){
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=6';
    return this.http.get(this.url);
  }

  buscarFolio(pedido: any, serie: any){
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=10&pedido=' + pedido + '&serie=' + serie;
    return this.http.get(this.url);
  }

  buscarIdGrafica(id: any){
    this.url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=11&id=' + id ;
    return this.http.get(this.url);
  }
}
