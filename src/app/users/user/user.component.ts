import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit(): void {
    this.route.data.subscribe({
      next: ({ user }) => {
        console.log(user);
      }
    })
  }

}
