import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servicios/user.service';
import { User } from '../modelos/user.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registerUserData : User;
  constructor(private _usuarioSvr: UserService,private _routes:Router, private toastr: ToastrService) {
    this.registerUserData = new User();
   }
   public RolUser = [
      { value: 'vendedor', display: 'Vendedor' },
      { value: 'comprador', display: 'Comprador' }
  ];
 
  
  ngOnInit(): void {
    this.registerUserData.Role= "vendedor";
  }

  registerUser(): void{    

    this._usuarioSvr.formData = this.registerUserData;
    this._usuarioSvr.postUser().subscribe(
      res => {
        this.toastr.info('Datos guardados', 'Usuario registrado correctamente');
       // this._routes.navigate(['/ingresar']);

      },
      err=>{console.log(err)}
    );
   // this._routes.navigate(['/ingresar']);
  }
}