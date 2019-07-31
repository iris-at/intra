import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styles: []
})
export class PedidosComponent implements OnInit {

  @Input() titulo: string;
  @Input() info: any[];
  @Input() total: number;

  constructor() { }

  ngOnInit() {
  }

}
