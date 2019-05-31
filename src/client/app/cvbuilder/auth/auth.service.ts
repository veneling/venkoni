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

  register(user: User):Observable<boolean> {
    return this.http.post<{email: string, token: string}>('/users/register', user)
    .pipe(
      map(result=> {
        sessionStorage.setItem('user_email', result.email);
        sessionStorage.setItem('access_token', result.token);
        return true;
      })
    );
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{email: string, token: string}>('/users/login', { email: email, password: password })
    .pipe(
      map(result => {
        sessionStorage.setItem('user_email', result.email);
        sessionStorage.setItem('access_token', result.token);
        return true;
      })
    )
  }

  logout() {
    sessionStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (sessionStorage.getItem('access_token') != null);
  }
}
