import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

  setHttpOptions() {
    let httpOptions = {
      headers: new HttpHeaders({ 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
      }),
      withCredentials: true
    };
    let token = sessionStorage.getItem('access_token');
    if(token) {
      httpOptions.headers = httpOptions.headers.append('Authorization', 'Bearer ' + token );
    }
    return httpOptions;
  }
  
    isLoggedIn() {
    const token: string = this.tokenGetter();

    if (!token) {
      return false;
    }

    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(token);
    return !tokenExpired;
  }

  register(user: User): Observable<boolean> {
    return this.http.post<{
      email: string, 
      token: string, 
      firstName: string,
      lastName: string
    }>('/users/register', user, this.setHttpOptions())
    .pipe(
      map(result=> {
        sessionStorage.setItem('user_email', result.email);
        sessionStorage.setItem('access_token', result.token);
        sessionStorage.setItem('firstName', result.firstName);
        sessionStorage.setItem('lastName', result.lastName);
        return true;
      })
    );
  }

  login(email: string, password: string): Observable<boolean> {

    return this.http.post<{
      email: string, 
      token: string, 
      firstName: string,
      lastName: string
    }>('/users/login', { email: email, password: password }, this.setHttpOptions())
    .pipe(
      map(result => {
        sessionStorage.setItem('user_email', result.email);
        sessionStorage.setItem('access_token', result.token);
        sessionStorage.setItem('firstName', result.firstName);
        sessionStorage.setItem('lastName', result.lastName);
        return true;
      })
    )
  }

  logout() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (sessionStorage.getItem('access_token') != null);
  }

  tokenGetter() {
    return sessionStorage.getItem('access_token');
  }

  profile(): Observable<any> {
    return this.http.get<any>('/users/profile/' + sessionStorage.getItem('user_email'), this.setHttpOptions())
    .pipe(
      // catchError((err) => Observable.throw(err)),
      map(
        response => {
          console.log(response);
        }
      )
    )
  }
}
