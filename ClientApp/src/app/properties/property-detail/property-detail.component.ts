import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../servicios/property.service';
import { Property } from '../../modelos/property.model';
import { PropertyList}  from '../../modelos/property-list.model';
import { map } from "rxjs/operators"; 
import { Observable } from "rxjs"; 

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styles: [
  ]
})
export class PropertyDetailComponent implements OnInit {
  listProperty = new PropertyList();
   
  constructor(public service: PropertyService) { 
    
  }

  ngOnInit(): void {
    var id = localStorage.getItem('propertyId');  
    console.log("llega");
    this.service.getProperty(id).subscribe(
      res =>{
        this.listProperty.Data = res.Data; 
        console.log(this.listProperty.Data);       
      }
      );
  }    

  resultDetail(){   
    
  }
}