import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Configuración
import { URL_EXTERNO, PUERTO_SERVER } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerInfo(codigo: number) {
    const url = URL_EXTERNO + ':' + PUERTO_SERVER + '/api/almacen.php?opcion=21&codigo=' + codigo;

    return this.http.get(url);
  }
}
