import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Modelos
import { Usuario } from '../models/usuario.model';

//Servicios
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  email: string;
  iniciar: boolean = false;
  error: boolean = false;
  mensaje: string;

  constructor(
    private router: Router,
    private usuario: UsuarioService
  ) { }

  ngOnInit() {
  }

  ingresar(form: any) {
    this.iniciar = true;
    this.error = false;
    
    if (form.invalid) {
      return;
    }

    const usuario = new Usuario(null, form.value.email, form.value.password);
    this.usuario.login(usuario).subscribe((resp: any) => {
      if (resp.ok) {
        if (resp.usuario.rol === 'ALMACEN_ROLE' || resp.usuario.rol === 'ALMACENISTA_ROLE' || resp.usuario.rol === 'ADMIN_ROLE') {
          console.log(resp);
          this.iniciar = false;
          this.error = false;
          this.router.navigate(['/dashboardAlmacen']);
        } else {
          this.iniciar = false;
          this.error = true;
          this.mensaje = 'Este usuario no tiene permitido ingresar';
        }
      } else {
        this.iniciar = false;
        this.error = true;
        this.mensaje = resp.mensaje;
      }
    }, error => {
      this.error = true;
      this.mensaje = error.message;
    });
  }

}
