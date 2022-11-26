import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityUtilities } from '../security/utils/security.utils';
import { LoginService } from '../services/security/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authToken = SecurityUtilities.getToken();
    if (authToken) {
      const userData = SecurityUtilities.getUser();
      
      if (route.data.role && userData.profiles.findIndex((i) => i.name === route.data.role) === 0) {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
