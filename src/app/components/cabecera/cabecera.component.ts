import { Component, OnInit } from '@angular/core';

//Servicios
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styles: []
})
export class CabeceraComponent implements OnInit {

  menu: any[] = [];

  constructor(
    public usuarioService: UsuarioService
  ) {
    this.menu = this.usuarioService.menu;
   }

  ngOnInit() {
  }

}
