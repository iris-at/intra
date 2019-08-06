import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import ngx-barcode module
import { NgxBarcodeModule } from 'ngx-barcode';

// Imprimir
import {NgxPrintModule} from 'ngx-print';

// Graficas ng2-charts
import { ChartsModule } from 'ng2-charts/ng2-charts';

// Rutas
import { PAGES_ROUTES } from './pages.routes';

// Páginas
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { TicketComponent } from './ticket/ticket.component';

// Componentes
import { PedidosComponent } from '../components/pedidos/pedidos.component';
import { GraficaComponent } from '../components/grafica/grafica.component';

@NgModule({
    declarations: [
        // Páginas
        DashboardComponent,
        ConsultasComponent,
        TicketComponent,
        // Components
        PedidosComponent,
        GraficaComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        PAGES_ROUTES,
        ChartsModule,
        NgxBarcodeModule,
        NgxPrintModule
    ]
})

export class PagesModule { }
