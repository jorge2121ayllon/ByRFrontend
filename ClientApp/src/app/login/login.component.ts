import { Component, OnInit } from '@angular/core';
import { UsuarioDetalle } from '../modelos/usuario-detalle.model';
import { UsuarioDetalleService } from '../servicios/usuario-detalle.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData : UsuarioDetalle;

  constructor(private _usuarioSvr: UsuarioDetalleService,private _routes:Router) { 
    this.loginUserData = new UsuarioDetalle();
  }

  ngOnInit(): void {
  
  }

  loginUser(): void {
    console.log(this.loginUserData);
    this._usuarioSvr.authUsuarios(this.loginUserData.Nombre, this.loginUserData.Clave).subscribe(
      res => {
      console.log(res);
      localStorage.setItem('UserId', (res as any).Id);
      localStorage.setItem('Token', (res as any).Token);
      this._routes.navigate(['/inicio']);
    },
    err => {
      console.log(err);
          if(err instanceof HttpErrorResponse){
              if(err.status === 404){
                  this._routes.navigate(['/login']);
              }
          }
        }
    );
  }



}