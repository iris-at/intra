import { Routes, RouterModule } from '@angular/router';

//Guardias
import { LoginGuard } from './guards/login/login.guard';

//Paginas
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        loadChildren: './pages/pages.module#PagesModule'
    },
    // { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes);
