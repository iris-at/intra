import { Routes, RouterModule } from '@angular/router';

//Guardia
import { VerificatokenGuard } from '../guards/verificatoken/verificatoken.guard';

//Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { TicketComponent } from './ticket/ticket.component';

const pageRoutes: Routes = [
    {
        path: 'dashboardAlmacen',
        canActivate: [ VerificatokenGuard ],
        component: DashboardComponent,
        data:   {
                    titulo: 'Dashboard',
                    name: 'description'
                }
    },
    {
        path: 'consultas',
        canActivate: [ VerificatokenGuard ],
        component: ConsultasComponent,
        data:   {
                    titulo: 'Consultas',
                    name: 'description'
                }
    },
    {
        path: 'ticket',
        canActivate: [ VerificatokenGuard ],
        component: TicketComponent,
        data:   {
                    titulo: 'Tickets',
                    name: 'description'
                }
    },
    {
        path: '',
        canActivate: [ VerificatokenGuard ],
        redirectTo: '/dashboardAlmacen',
        pathMatch: 'full'
    }
   
];

export const PAGES_ROUTES = RouterModule.forChild(pageRoutes);
