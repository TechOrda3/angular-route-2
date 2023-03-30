import {Routes} from '@angular/router';
import {UserRootComponent} from './user-root/user-root.component';
import {UsersComponent} from './users.component';

export const usersRoutes: Routes = [
  {
    path: '',
    component: UserRootComponent,
    children: [
      {
        path: 'list',
        component: UsersComponent
      },
      {
        path: ':id',
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
