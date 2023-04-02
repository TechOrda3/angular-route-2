import { NgModule } from '@angular/core';
import { UserRootComponent } from './user-root/user-root.component';
import {UsersComponent} from './users.component';
import {RouterModule} from '@angular/router';
import {usersRoutes} from './routes';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    UserRootComponent,
    UsersComponent,
    UserComponent,
  ],
  imports: [
    FormsModule,
    NgForOf,
    RouterModule.forChild(usersRoutes),
  ]
})
export class UsersModule { }
