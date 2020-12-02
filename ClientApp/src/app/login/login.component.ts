import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../servicios/user.service';
import { User } from '../modelos/user.model';
import { Console } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData : User;

  constructor(private _usuarioSvr: UserService,private _routes:Router,private toastr: ToastrService) { 
    this.loginUserData = new User();
  }

  ngOnInit(): void {
  
  }

  loginUser(): void {
    this._usuarioSvr.authUser(this.loginUserData.Email, this.loginUserData.Password).subscribe(
      res => {
      localStorage.setItem('UserId', (res as any).Id);
      localStorage.setItem('Token', (res as any).Token);
      localStorage.setItem('Role', (res as any).Role);
      localStorage.setItem('UserName', this.loginUserData.Email);
      if(localStorage.getItem('Role')== "vendedor")
      {
        this._routes.navigate(['//propiedades']);
      }
      if(localStorage.getItem('Role')== "administrador"){

        this._routes.navigate(['/usuariosLista']);
      }
      if(localStorage.getItem('Role')== "comprador")
      {
        this._routes.navigate(['/inicio']);
      }
   
    },
    err => {
          this.toastr.info('Usuario o clave incorrectos');
        }
    );
  }



}