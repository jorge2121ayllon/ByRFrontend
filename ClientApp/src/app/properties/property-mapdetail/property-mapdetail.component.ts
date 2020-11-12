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
  constructor(public service: PropertyService,private toastr: ToastrService) { }


  ngOnInit(): void {

    (mapboxgl.accessToken as any) = environment.mapboxkey;
    this.mapa2 = new mapboxgl.Map({
     container: 'mapa-mapbox', // container id
     style: 'mapbox://styles/mapbox/streets-v11',
     center: [-64.732951, -21.531428],  // starting position
     zoom: 15 // starting zoom
    });


    this.mapa2.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
    }));


    this.crearMarcador();
  }

  crearMarcador() {
      this.data.Data.forEach(e => {
      const popup4 = new mapboxgl.Popup({offset:[1,1]})
      .setHTML(`<h3>${e.Description}</h3></br>
                <h6><small>Baños : ${e.Bedrooms}</small></h6>
                <h6><small>Precio : ${e.Price}</small></h6>
                <h6><small>Tamaño : ${e.Size}</small></h6>
                <h6><small>Descripcion : ${e.Size}</small></h6>` +
                `<img [src]="'data:image/jpg;base64,'${e.imagen64portada}"/>`
              )
      const marker = new mapboxgl.Marker({
        draggable: false
        })
        .setLngLat([e.Longitude,e.Latitude])
        .setPopup(popup4)
        .addTo(this.mapa2);
    });
  }
}
