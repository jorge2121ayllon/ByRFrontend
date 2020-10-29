import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
  import { PropertyService } from '../servicios/property.service';
  import { ToastrService } from 'ngx-toastr';
  import {PropertyList} from 'src/app/modelos/property-list.model';
  import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public myform: FormGroup;
  public imageConfirm: boolean;
  listProperty = new PropertyList();
  constructor(public formBuilder: FormBuilder,
              public service: PropertyService,
               private toastr: ToastrService,
               private _routes:Router) { 
    this.imageConfirm = false;
  }

  ngOnInit(): void {  
    this.Role();
    this.myform = new FormGroup({
      busqueda : new FormControl('', [Validators.required])       
    });
  }

  Role(){
    var roleActual = localStorage.getItem('Role');    
    if(roleActual == 'comprador' )
    {
      return false;
    }
    else{
      return true;
    }
  }  
  
  buscarPropiedad(){
    var serch = this.myform.value.busqueda.toString();    
    this.service.serchProperties(serch).subscribe(
      res => {    
        this.listProperty.Data = res.Data;    
        this.listProperty.TotalRows = res.TotalRows;                
        if(this.listProperty.TotalRows>0)
        {
        this.toastr.info('Busqueda exitosa', '');   
        this.imageConfirm = true;                        
        this.listProperty = res;
        }
        else{
          this.toastr.error('Ups!', 'No se encontró ningun resultado para su búsqueda');
          this.myform = new FormGroup({
            busqueda : new FormControl('', [Validators.required])       
          }); 
          this.imageConfirm = false;
        }
      },
      err=>{
        console.log(err);
        this.toastr.error('Ups!', 'No se encontró ningun resultado para su búsqueda'); 
      });
  }
  
  getConfirmSerch(){
    if(this.imageConfirm==true)
      {
        return true;
      }
      else{
        return false;
      }
  }

  getPropertyDetail(id){
    console.log(id);
    localStorage.setItem('propertyId',id);    
    this._routes.navigate(['/propiedadDetalle']);
  }

}