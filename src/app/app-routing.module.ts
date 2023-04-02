import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, Routes} from '@angular/router';
import {AuthService} from './auth.service';
import {inject, Injectable} from '@angular/core';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuth) {
    return true;
  }
  return router.parseUrl('/login');
};

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isAuth) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUri = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}

export const routes: Routes = [
  {
    path: 'login',
    // component: LoginComponent
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./users/users.module').then(c => c.UsersModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
