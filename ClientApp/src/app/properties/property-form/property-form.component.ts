import { PropertyService } from '../../servicios/property.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {PropertyList} from 'src/app/modelos/property-list.model';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styles: [
  ]
})
export class PropertyFormComponent implements OnInit {

  
  public latLogn = {};
  mapa: mapboxgl.Map;

  private imagen:any;

  constructor(public service: PropertyService, private toastr: ToastrService,private _routes:Router) { }
  public Categories = [

      { value: 1, display: 'Venta' },
      { value: 2, display: 'Alquiler' },
      { value: 3, display: 'Anticretico' }
  ];

  public TypeProperties = [
    { value: 1, display: 'Vivienda' },
    { value: 2, display: 'Terreno' }
  ];
  static latitud: string;
  static longitud: string;


  ngOnInit(): void {
    
    this.resetForm();
    (mapboxgl.accessToken as any) = environment.mapboxkey;

    this.mapa = new mapboxgl.Map({
     container: 'mapa-mapbox', // container id
     style: 'mapbox://styles/mapbox/streets-v11',
     center: [-64.732951, -21.531428], // starting position
     zoom: 15 // starting zoom
    });

    this.mapa.addControl(
       new mapboxgl.GeolocateControl({
       positionOptions: {
       enableHighAccuracy: true
       },
       trackUserLocation: true
     }));

    this.crearMarcador(this.latLogn);
  }


  crearMarcador(latitudLongitud) {
    const marker = new mapboxgl.Marker({
    draggable: true
    })
    .setLngLat([ -64.732951, -21.531428])
    .addTo(this.mapa);

    this.mapa.on('click', function(e) {
        marker.setLngLat([e.lngLat['lng'], e.lngLat['lat']]);
        foo(e);
    }
    );
}



  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: null,
      Price: null,
      Bedrooms: null,
      Bathrooms: null,
      Size: null,
      Direction: '',
      State: false,
      Description: '',
      Latitude: '',
      Longitude: '',
      Category: 1,
      TypeProperty: 1,
      UserIdPro: null,
      imageurl: '',
      nombreimagen:''
    }
  }

  refreshData() {
    this.service.refreshList().subscribe((result: PropertyList) => {
    });
  }

  onSubmit(form: NgForm) {
    this.service.formData.Latitude = String(PropertyFormComponent.latitud);
    this.service.formData.Longitude = String(PropertyFormComponent.longitud);
    var category = Number(this.service.formData.Category);
    var type = Number(this.service.formData.TypeProperty);    
    this.service.formData.TypeProperty = type;
    this.service.formData.Category = category;
    this.service.formData.imageurl = localStorage.getItem('base64');
    this.service.formData.nombreimagen = localStorage.getItem('filename'); 
    console.log(this.service.formData);   
    if (this.service.formData.Id == null){
      this.insertRecord(form);
      }

    else
      this.updateRecord(form);
    }

  updateRecord(form: NgForm) {
    this.service.putProperty().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Datos guardados', 'Su propiedad editada se guardo correctamente');
        this.refreshData();
      },
      err => {
        console.log(err);
      }
    )
  }


  insertRecord(form: NgForm) {
    this.service.postProperty().subscribe(
      res => {
        this.resetForm(form); 
        this.toastr.info('Datos guardados', 'Su propiedad se guardo correctamente');
        this.refreshData();
        localStorage.removeItem('base64');
        localStorage.removeItem('filename');
      },
      err => { console.log(err); }
    )
  }


  uploadImage(event:any):void{
    this.imagen = event.target.files[0];
    console.log('Imagen => ',this.imagen);
  }

  //probando
  imageSrc;
  sellersPermitFile: any;
  DriversLicenseFile: any;
  InteriorPicFile: any;
  ExteriorPicFile: any;
  //base64s
  sellersPermitString: string;
  DriversLicenseString: string;
  InteriorPicString: string;
  ExteriorPicString: string;
  //json
  finalJson = {};

  currentId: number = 0;

  addPictures() {
    this.finalJson = {
      "sellersPermitFile": this.ExteriorPicString,
      "DriversLicenseFile": this.DriversLicenseString,
      "InteriorPicFile": this.InteriorPicString,
      "ExteriorPicFile": this.ExteriorPicString
    }
  }
  public picked(event, field) {
    this.currentId = field;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (field == 1) {
        this.sellersPermitFile = file;
        this.handleInputChange(file); //turn into base64
      }
      else if (field == 2) {
        this.DriversLicenseFile = file;
        this.handleInputChange(file); //turn into base64
      }
      else if (field == 3) {
        this.InteriorPicFile = file;
        this.handleInputChange(file); //turn into base64
      }
      else if (field == 4) {
        this.ExteriorPicFile = file;
        this.handleInputChange(file); //turn into base64

      }
    }
    else {
      alert("No file selected");
    }
  }

  handleInputChange(files) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);    
    reader.readAsDataURL(file);
    localStorage.setItem('filename',file.name);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    localStorage.setItem('base64',base64result);
    let id = this.currentId;
    switch (id) {
      case 1:
        this.sellersPermitString = base64result;        
        break;
      case 2:
        this.DriversLicenseString = base64result;
        break;
      case 3:
        this.InteriorPicString = base64result;
        break;
      case 4:
        this.ExteriorPicString = base64result;
        break
    }

    //this.log();
  }

  log() { 
    // for debug
    console.log('1', this.sellersPermitString);
    console.log('2', this.DriversLicenseString);
    console.log('3', this.InteriorPicString);
    console.log('4', this.ExteriorPicString);
  }


}

function foo(e) { 
  
  // tslint:disable-next-line: whitespace
  PropertyFormComponent.latitud=String(e.lngLat['lat']);
  PropertyFormComponent.longitud=String(e.lngLat['lng']);

  console.log(e.lngLat['lat'])
  console.log(e.lngLat['lng'])

}