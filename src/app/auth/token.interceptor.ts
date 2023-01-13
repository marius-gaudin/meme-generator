import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { JWTTokenService } from '../services/jwttoken.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private jwtTokenService:JWTTokenService, private router:Router, private apiService: ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.jwtTokenService.getToken()
    if(token !== null && request.url.startsWith(this.apiService.url)) {
      let newRequest = request.clone({
        headers: request.headers.set('Authorization', `bearer ${token}`)
      })
      return next.handle(newRequest).pipe(
        catchError(error => {
          if(error.status === 401) {
            this.router.navigate(['login'])
          }
          return new Observable<any>(observer => {
            observer.next(new Error(error.message))
          })
        })
      )
    }
    return next.handle(request)
  }
}

export const TokenInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}