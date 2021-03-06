import { Routes, RouterModule } from '@angular/router';

// Guardias
import { LoginGuard } from './guards/login/login.guard';

// Paginas
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { EtiquetasComponent } from './etiquetas/etiquetas.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'etiquetas', component: EtiquetasComponent },
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: LoginComponent }
    // { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes , { useHash: true} );
