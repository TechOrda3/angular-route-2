import {Component, inject} from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule
  ]
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  payload = {
    email: '',
    password: ''
  };

  submit() {
    this.authService.login(this.payload).subscribe({
      next: response => {
        this.authService.setToken(response.token)
        this.router.navigate(['/users/']);
      }
    })
  }
}
