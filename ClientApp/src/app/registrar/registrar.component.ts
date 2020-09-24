import { Component, OnInit } from '@angular/core';
import { UsuarioDetalle } from '../modelos/usuario-detalle.model';
import { UsuarioDetalleService } from '../servicios/usuario-detalle.service';
import { Router } from '@angular/router';
import { UserService } from '../servicios/user.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registerUserData : UsuarioDetalle;
  constructor(private _usuarioSvr: UserService,private _routes:Router) {
    this.registerUserData = new UsuarioDetalle();
   }

  ngOnInit(): void {
  }

  registerUser(): void{
    this._usuarioSvr.formData = this.registerUserData;
    this._usuarioSvr.putUser().subscribe(
      res => {
        this._routes.navigate(['/']);
      },
      err=>{console.log(err)}
    );
    this._routes.navigate(['/']);
  }
}