import { Routes } from '@angular/router';
import { HomePageComponent } from '../home-page/home-page.component';
import { UsersPageComponent } from '../users-page/users-page.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { UserCreateComponent } from './user-create/user-create.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../home-page/home-page.component').then((m) => m.HomePageComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('../users-page/users-page.component').then((m) => m.UsersPageComponent)
  },
  {
    path: 'us', 
    loadComponent: () => import('./user-create/user-create.component').then((m) => m.UserCreateComponent)
  },
  {
    path: '**',
    loadComponent: () => import('../not-found-page/not-found-page.component').then((m) => m.NotFoundPageComponent)
  },
];
