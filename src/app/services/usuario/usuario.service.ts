import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

//Configuracion
import { URL_EXTERNO, PUERTO_INTERNO } from 'src/app/config/config';

//Modelos
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = '';
  usuario: Usuario;
  menu: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.cargarStorage();
  }

  estalogeado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any, rol: any) {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('id');
    localStorage.removeItem('rol');
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ));
    localStorage.setItem( 'menu', JSON.stringify( menu ));
    localStorage.setItem( 'rol', rol);

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('id');
    localStorage.removeItem('socketUsuario');

    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email);
    } else {
      localStorage.removeItem( 'email' );
    }

    let url;

    url = URL_EXTERNO + ':' + PUERTO_INTERNO + '/login';

    return this.http.post( url, usuario ).pipe(
      map( ( resp: any ) => {
        if (resp.ok) {
          this.usuario = null;
          this.token = '';
          this.menu = [];

          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          localStorage.removeItem('menu');
          localStorage.removeItem('id');
          localStorage.removeItem('socketUsuario');
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu, resp.usuario.rol);
          return resp;
        } else {
          return resp;
        }
      }));
  }

}
