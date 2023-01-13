import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JWTTokenService } from 'src/app/services/jwttoken.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
  constructor(private jwtService: JWTTokenService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const token: any = this.jwtService.getDecodeToken()
    if(token?.user && !this.jwtService.isTokenExpired(token)) return true
    else {
      this.router.navigate(['login'])
      return false
    }

  }
  
}
