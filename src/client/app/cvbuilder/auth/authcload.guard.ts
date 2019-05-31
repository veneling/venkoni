import { Injectable } from '@angular/core';
import { CanLoad, Router, Route } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthcloadGuard implements CanLoad {

  constructor(private router: Router) { }

  canLoad(route: Route): boolean {
    if (sessionStorage.getItem('access_token')) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
