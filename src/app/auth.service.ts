import {inject, Injectable} from '@angular/core';
import {API_URL} from './common/token';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';

const TOKEN_KEY = 'token-key'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = inject(API_URL);
  private httpClient = inject(HttpClient);

  isAuth = false;

  constructor() {
    if (!!localStorage.getItem(TOKEN_KEY)) {
      this.isAuth = true
    }
  }

  login(payload: { email: string, password: string }) {
    return this.httpClient.post<{token: string}>(`${this.apiUrl}login`, payload).pipe(
      tap(() => this.isAuth = true)
    )
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }
}
