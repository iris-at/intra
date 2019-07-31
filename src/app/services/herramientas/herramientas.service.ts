import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HerramientasService {

  constructor() { }

  fechaActual() {
    let h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    const fecha = anio + '-' + mes + '-' + dia;
    return fecha;
  }

  horaActual() {
    let h = new Date();

    let hour;

    if (h.getHours() < 10) {
      hour = '0' + h.getHours();
    } else {
      hour = h.getHours();
    }

    let minutes;

    if (h.getMinutes() < 10) {
      minutes = '0' + h.getMinutes();
    } else {
      minutes = h.getMinutes();
    }

    let seconds;

    if (h.getSeconds() < 10) {
      seconds = '0' + h.getSeconds();
    } else {
      seconds = h.getSeconds();
    }

    const hora = hour + ':' + minutes + ':' + seconds;
    return hora;
  }

  horaActualDigito() {
    let h = new Date();

    let hour;

    if (h.getHours() < 10) {
      hour = '0' + h.getHours();
    } else {
      hour = h.getHours();
    }

    const hora = hour;
    return hora;
  }

  fechaInicialMesActual() {
    let h = new Date();

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    let anio = h.getFullYear();

    const fecha = anio + '-' + mes + '-01';
    return fecha;
  }
}
