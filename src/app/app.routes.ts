import { Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';
import { anonymousGuard } from '../core/guards/anonymous.guard';
import { FullComponent } from '../layouts/full/full.component';

export const routes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'tasks'
            },
            {
                path: 'tasks',        
                canActivate: [authGuard],
                loadComponent: () =>  import('../pages/todo-list/todo-list.component').then(m => m.TodoListComponent),
            },
        ]
    },
    {
        path: 'login',
        canActivate: [anonymousGuard],
        loadComponent: () => import('../core/user/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'start',
        loadComponent: () => import('../core/components/mobile-landing/mobile-landing.component').then(m => m.MobileLandingComponent),
    },
    {
        path: '**',
        redirectTo: 'tasks'
    },
];

