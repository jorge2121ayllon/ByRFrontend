import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../servicios/user.service';
import { User } from '../modelos/user.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  registerUserData : User;
  public myform: FormGroup;

  constructor(private _usuarioSvr: UserService,private _routes:Router, private toastr: ToastrService, public formBuilder: FormBuilder) {
    this.registerUserData = new User();     
   }
   public RolUser = [
      { value: 'vendedor', display: 'Vendedor' },
      { value: 'comprador', display: 'Comprador' }
  ];
 
  
  ngOnInit(): void {
    this.registerUserData.Role= "vendedor";
    this.myform = new FormGroup({
      name : new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email :  new FormControl('', [Validators.required, Validators.email]),
      phone : new FormControl('', [Validators.required, Validators.minLength(5)]),
      ci : new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])      
    });
  }


  registerUser(): void{    

    this._usuarioSvr.formData = this.myform.value;
    console.log(this.myform.value);
        
    this._usuarioSvr.postUser().subscribe(
      res => {
        this.toastr.info('Datos guardados', 'Usuario registrado correctamente');
        this._routes.navigate(['/ingresar']);
      },
      err=>{console.log(err)}
    );
    this._routes.navigate(['/ingresar']);
  }
    

}