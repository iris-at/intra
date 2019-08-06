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

  constructor(
    private pedidosService: PedidosService
  ) {}

  ngOnInit() {
    this.obtenerPartidas();
  }

  obtenerPartidas() {
    // if (this.input.nativeElement.value === '') {
    //   return;
    // }

    // const buscar = this.input.nativeElement.value.split('-');
    // if (buscar.length > 1) {
      // this.pedidosService.obtenerPartidasPedido(buscar[1], buscar[0]).subscribe((resp: any) => {
      this.pedidosService.obtenerPartidasPedido('1400', 'Q').subscribe((resp: any) => {
        if (resp.length > 0) {
          console.log(resp);
          this.folio = this.input.nativeElement.value;
          this.partidas = resp;
        }
        this.input.nativeElement.value = '';
      });
    // }
  }

  textCodBar(partida: any) {
    const codbar = `01${partida.codigo}0000${partida.cantsol}`;
    return codbar;
  }

}
