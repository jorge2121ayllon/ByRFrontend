import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../servicios/property.service';
import { Property } from '../../modelos/property.model';
import { PropertyList}  from '../../modelos/property-list.model';
import { map } from "rxjs/operators"; 
import { Observable } from "rxjs"; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styles: [ './property-detail.component.css'
  ]
})
export class PropertyDetailComponent implements OnInit {
  listProperty = new PropertyList();
   categoryProperty : string;
   typeProperty: string;
  constructor(public service: PropertyService,private _routes:Router) { 
    
  }

  ngOnInit(): void {
    var id = localStorage.getItem('propertyId');
    this.service.getProperty(id).subscribe(
      res =>{
        this.listProperty.Data = res.Data; 
        if(this.listProperty.Data[0].TypeProperty == 1)
        {
          this.typeProperty = "Vivienda";
        }
        else{
          this.typeProperty = "Terreno";
        }
        if(this.listProperty.Data[0].Category == 1)
        {
          this.categoryProperty = "Venta";
        }
        else if(this.listProperty.Data[0].Category == 2)
        {
          this.categoryProperty = "Alquiler";
        }
        else{
          this.categoryProperty = "Anticrético";
        }
        this.service.GetGalleryByPropertyId(this.listProperty.Data[0].Id);  
      }
      );

      
  }    

  resultDetail(){   
    
  }

  volverInicio(){
      if(localStorage.getItem('Role')== "vendedor")
      {
        this._routes.navigate(['//propiedades']);
      }
      else
      {
        this._routes.navigate(['/inicio']);
      }
      
  }
}