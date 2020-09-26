import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servicios/user.service';
import { User } from '../modelos/user.model';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registerUserData : User;
  constructor(private _usuarioSvr: UserService,private _routes:Router) {
    this.registerUserData = new User();
   }
   public TypeProperties = [
      { value: 'vendedor', display: 'Vendedor' },
      { value: 'comprador', display: 'Comprador' }
  ];

  ngOnInit(): void {
  }

  registerUser(): void{
    this._usuarioSvr.formData = this.registerUserData;
    this._usuarioSvr.postUser().subscribe(
      res => {
        this._routes.navigate(['/']);
      },
      err=>{console.log(err)}
    );
    this._routes.navigate(['/']);
  }
}