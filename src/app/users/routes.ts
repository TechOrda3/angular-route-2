import {ActivatedRouteSnapshot, ResolveFn, Router, Routes} from '@angular/router';
import {UserRootComponent} from './user-root/user-root.component';
import {UsersComponent} from './users.component';
import {UserComponent} from './user/user.component';
import {inject} from '@angular/core';
import {UsersService} from '../users.service';
import {delay, EMPTY, of, switchMap} from 'rxjs';

export const userDetail: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const userService = inject(UsersService);
  const id = route.paramMap.get('id')!;

  return userService.getUser(id).pipe(
    // delay(3000),
    switchMap(user => {
      if (user) {
        return of(user);
      } else {  // id not found
        router.navigate(['/users']);
        return EMPTY;
      }
    }));
};

export const userTitle: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const userService = inject(UsersService);
  const id = route.paramMap.get('id')!;

  return userService.getUser(id).pipe(
    // delay(3000),
    switchMap(({data: { first_name }}) => {
      if (first_name) {
        return of(first_name);
      } else {  // id not found
        router.navigate(['/users']);
        return EMPTY;
      }
    }));
};

export const usersRoutes: Routes = [
  {
    path: '',
    component: UserRootComponent,
    children: [
      {
        path: 'list',
        title: 'Список пользователей',
        component: UsersComponent
      },
      {
        path: ':id',
        resolve: {
          user: userDetail
        },
        title: userTitle,
        component: UserComponent
      },
      {
        path: 'form',
        // component: UserDetailComponent
        loadComponent: () => import('../user-detail/user-detail.component').then(c => c.UserDetailComponent),
        outlet: 'modal'
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
]
