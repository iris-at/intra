import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Servicios
import { ArticuloService } from '../services/articulo/articulo.service';

@Component({
  selector: 'app-etiquetas',
  templateUrl: './etiquetas.component.html',
  styleUrls: ['./etiquetas.component.css']
})
export class EtiquetasComponent implements OnInit {

  @ViewChild('codigo') codigo: ElementRef;
  code = '';
  @ViewChild('cantidad') cantidad: ElementRef;
  cantNum = 0;
  cant = '';

  articulo: any = '';

  // Código de Barras
  useExistingCss = true;
  elementType = 'svg';
  format = 'CODE128';
  lineColor = '#000000';
  width = 3;
  height = 100;
  displayValue = false;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'center';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 20;
  background = '#ffffff';
  margin = 10;
  marginTop = 10;
  marginBottom = 10;
  marginLeft = 10;
  marginRight = 10;

  constructor(
    private articuloService: ArticuloService
  ) {}

  ngOnInit() {
    // this.obtenerPartidas();
  }

  /*obtenerPartidas() {
    if (this.input.nativeElement.value === '') {
      return;
    }

    const buscar = this.input.nativeElement.value.split('-');
    if (buscar.length > 1) {
      this.pedidosService.obtenerPartidasPedido(buscar[1], buscar[0]).subscribe((resp: any) => {
      // this.pedidosService.obtenerPartidasPedido('10478', 'G').subscribe((resp: any) => {
        if (resp.length > 0) {
          this.folio = this.input.nativeElement.value;
          this.partidas = resp;
        }
        this.input.nativeElement.value = '';
      });
    }
  }*/

  buscarFolio() {
    if (this.codigo.nativeElement.value === '') {
      return;
    }

    const codigo = this.codigo.nativeElement.value;
    this.articuloService.obtenerInfo(codigo).subscribe((resp: any) => {
      if (resp.length > 0) {
        this.cantidad.nativeElement.focus();
        this.articulo = resp[0];
        this.code = this.codigo.nativeElement.value;
        this.cant = '0';
        this.cantNum = 0;
      }
    });
  }

  hacerBarCode() {
    if (this.cantidad.nativeElement.value === '') {
      return;
    }

    this.cant = this.zfill(this.cantidad.nativeElement.value, 5);
    this.cantNum = this.cantidad.nativeElement.value;
    this.codigo.nativeElement.value = '';
    this.cantidad.nativeElement.value = '';
    this.codigo.nativeElement.focus();
    const boton = (document.getElementById('botonImp')) as HTMLButtonElement;
    setTimeout(() => {
      boton.click();
      this.articulo = '';
    }, 500);
  }

  textCodBar(art: any) {
    const codbar = `01${this.code}${this.cant}`;
    return codbar;
  }

  zfill(numero: number, largo: number) {
    const numberOutput = Math.abs(numero); /* Valor absoluto del número */
    const length = numero.toString().length; /* Largo del número */
    const zero = '0'; /* String de cero */

    if (largo <= length) {
        if (numero < 0) {
             return ('-' + numberOutput.toString());
        } else {
             return numberOutput.toString();
        }
    } else {
        if (numero < 0) {
            return ('-' + (zero.repeat(largo - length)) + numberOutput.toString());
        } else {
            return ((zero.repeat(largo - length)) + numberOutput.toString());
        }
    }
}

  // imprimiCode(producto: any) {
  //   const dividir = producto.cantbar.split('#');
  //   const codbar = `01${producto.codigo}${dividir[1]}`;
  //   this.pedidosService.imprimirBarCode(codbar).subscribe((resp: any) => {
  //     console.log(resp);
  //   });
  // }

}
