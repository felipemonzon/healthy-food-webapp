import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/security/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    private authenticationService: LoginService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = this.authenticationService.getToken();
    if (authToken) {
      const userRole = this.authenticationService.getRoles();
      if (route.data.role && userRole.findIndex((i) => i.name === route.data.role) === 0) {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
