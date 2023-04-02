import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: true,
  imports: [RouterLink]
})
export class UserDetailComponent implements OnInit {
  router = inject(Router);
  location = inject(Location);

  constructor() { }

  ngOnInit(): void {
    // this.location.subscribe(res => {
    //   console.log({res})
    // })
  }

  back() {
    // this.router.navigate(['/users/', { outlets: {modal: null} }])
    this.location.back();
  }
}
