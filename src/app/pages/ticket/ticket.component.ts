import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Servicios
import { PedidosService } from 'src/app/services/pedidos/pedidos.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styles: []
})
export class TicketComponent implements OnInit {

  @ViewChild('input') input: ElementRef;

  partidas: any[] = [];
  folio: string;
  useExistingCss = true;
  elementType = 'svg';
  format = 'CODE39';
  lineColor = '#000000';
  width = 2;
  height = 100;
  displayValue = true;
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
    private pedidosService: PedidosService
  ) {}

  ngOnInit() {
    this.obtenerPartidas();
  }

  obtenerPartidas() {
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
  }

  textCodBar(partida: any) {
    const dividir = partida.cantbar.split('#');
    const codbar = `01${partida.codigo}${dividir[1]}`;
    return codbar;
  }

  imprimiCode(producto: any) {
    const dividir = producto.cantbar.split('#');
    const codbar = `01${producto.codigo}${dividir[1]}`;
    this.pedidosService.imprimirBarCode(codbar).subscribe((resp: any) => {
      console.log(resp);
    });
  }

}
