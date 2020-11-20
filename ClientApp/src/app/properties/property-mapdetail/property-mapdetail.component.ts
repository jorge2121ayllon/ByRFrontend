import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/servicios/property.service';
import { PropertyList } from 'src/app/modelos/property-list.model';
import { Property } from 'src/app/modelos/property.model';
import { stringify } from 'querystring';
import { element } from 'protractor';
import { UserService } from 'src/app/servicios/user.service';
import { PropertyListuser } from 'src/app/modelos/property-listuser.model';

@Component({
  selector: 'app-property-mapdetail',
  templateUrl: './property-mapdetail.component.html',
  styles: [
  ]
})
export class PropertyMapdetailComponent implements OnInit {
  mapa2: mapboxgl.Map;
  data = this.service.listaPropiedadesMapa;
  list: Property[];
  listProperty = new PropertyListuser();
  constructor(public service: PropertyService,public userservice: UserService, private toastr: ToastrService, private _routes:Router) { }


  ngOnInit(): void {

    (mapboxgl.accessToken as any) = environment.mapboxkey;
    this.mapa2 = new mapboxgl.Map({
     container: 'mapa-mapbox', // container id
     style: 'mapbox://styles/mapbox/streets-v11',
     center: [-64.732951, -21.531428],  // starting position
     zoom: 15 // starting zoom
    });


    this.crearMarcador();
  }
  
  volverInicio(){
    this._routes.navigate(['/inicio']);
  }
  crearMarcador() {
  
    
    this.data.Data.forEach(e => {


        this.service.getPropertyuser(e.Id).subscribe(
          res =>{ 

            this.listProperty.Data = res.Data; 

           // this.service.GetGalleryByPropertyId(this.listProperty.Data[0].Id);
            const popup4 = new mapboxgl.Popup({offset:[1,1]}).setHTML(
                          `
                       <div class="container" >
                          <div class="row">
                            <div class="col-md-12" >
                                <img src="data:image/png;base64, ${e.imagen64portada}"  width="100%" />
                            </div>
                            <div>
                            </div>
                            <div class="col-md-12" >
                                &nbsp;    <strong><i class="fas fa-bed"></i> Habitaciones ${e.Bedrooms}</strong>
                            </div>
                            <div class="col-md-12" >
                                &nbsp;   <strong><i class="fas fa-bath"></i> Baños ${e.Bathrooms}</strong>
                            </div>
                            <div class="col-md-12" >
                                &nbsp; <strong><i class="fas fa-ruler"></i> Tamaño ${e.Size} m2</strong>
                            </div>
                            <div class="col-md-12" >
                                &nbsp;  <strong><i class="fas fa-money-check-alt"></i> Precio ${e.Price} $ </strong>
                            </div>
                            <div class="col-md-12" >
                                &nbsp;  <strong>Descripcion : ${e.Description}</strong>
                            </div>

                            <hr>
                            <div class="col-md-12 text-center" >
                                <h6>Persona de contacto</h6>
                            </div>
                            <div class="col-md-12" >
                                <strong><i class="fa fa-user-circle"></i> Nombre : ${this.listProperty.Data[0].User.Name + this.listProperty.Data[0].User.LastName}</strong>
                            </div>
                            <div class="col-md-12" >
                                <strong><i class="fa fa-phone"></i> Celular : ${this.listProperty.Data[0].User.Phone} </strong>
                            </div>
                            <div class="col-md-12" >
                                 <strong><i class="fa fa-envelope"></i> Email : ${this.listProperty.Data[0].User.Email} </strong>
                            </div>
                          </div>
                        <div>`


                        )

            const marker = new mapboxgl.Marker({
            draggable: false
            })
            .setLngLat([e.Longitude,e.Latitude])
            .setPopup(popup4)
            .addTo(this.mapa2);




           
          }
          );



       

    });
  }


}
