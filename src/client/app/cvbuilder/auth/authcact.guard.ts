import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthcactGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (sessionStorage.getItem('access_token')) {
      return true;
    }

    this.router.navigate(['cvbuilder/login']);
    return false;
  }
}
