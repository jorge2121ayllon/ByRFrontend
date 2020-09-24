import { Inject, Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import { UsuarioDetalleService } from './servicios/usuario-detalle.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req, next){
    let authService = this.injector.get(UsuarioDetalleService);
    let tokenizedReq = req.clone({
      setHeaders:{
      Authorization:  `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}