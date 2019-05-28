import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post('/users/register', user);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>('/users/login', { email: email, password: password })
    .pipe(
      map(result => {
        localStorage.setItem('access_token', result.token);
        return true;
      })
    )
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') != null);
  }
}
