import { Routes } from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from './auth.service';

export const routes: Routes = [
  {
    path: 'login',
    // component: LoginComponent
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'users',
    // canLoad: [
    //   () => inject(AuthService).isAuth
    // ],
    loadChildren: () => import('./users/users.module').then(c => c.UsersModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
