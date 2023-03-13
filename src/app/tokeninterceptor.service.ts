import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

 intercept(req: HttpRequest<any>, next: HttpHandler) {
  let token = this.authService.getToken();
  if (token) {
    req = req.clone({
        setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
} else {
    req = req.clone({
        setHeaders: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json'
        }
    });
}

return next.handle(req);


 }
}
