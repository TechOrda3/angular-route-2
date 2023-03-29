import {Component, inject, OnInit} from '@angular/core';
import {UsersService} from '../users.service';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersService = inject(UsersService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  filter: any = {
    page: 1,
    per_page: 5
  };
  users: any[] = [];

  constructor() { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe({
      next: queryParamMap => {
        this.filter.page = queryParamMap.get('page') ?? 1;
        this.filter.per_page = queryParamMap.get('per_page') ?? 5;

        this.usersService.getUsers(this.filter).subscribe({
          next: users => {
            this.users = users;
          }
        })
      }
    })
  }

  onSearch() {
    const urlTree = new UrlTree();
    urlTree.queryParams = this.filter;

    this.router.navigate(['/users/list/'], { queryParams: urlTree.queryParams })
  }
}
