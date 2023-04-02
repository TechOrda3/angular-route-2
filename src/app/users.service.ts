import {inject, Injectable} from '@angular/core';
import {API_URL} from './common/token';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = inject(API_URL);
  private httpClient = inject(HttpClient);

  getUsers(filter: any) {
    const params = new HttpParams({ fromObject: filter })
    return this.httpClient.get<any>(`${this.apiUrl}users`, { params }).pipe(
      map(res => res.data)
    )
  }

  getUser(userId: string) {
    return this.httpClient.get<any>(`${this.apiUrl}users/${userId}`, )
  }
}
