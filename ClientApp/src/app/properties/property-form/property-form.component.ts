import { PropertyService } from '../../servicios/property.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {PropertyList} from 'src/app/modelos/property-list.model';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { userInfo } from 'os';
import { User } from 'src/app/modelos/user.model';
@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styles: [
  ]
})
export class PropertyFormComponent implements OnInit {

  public latLogn = {};
  mapa: mapboxgl.Map;
  url="https://kinsta.com/es/wp-content/uploads/sites/8/2018/02/leyenda-de-wordpress-1.png";
  private imagen: any;

  constructor(public service: PropertyService, private toastr: ToastrService,private _routes: Router) { }
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
  public latInitial = -64.732951;
  public longInitial = -21.531428;
  ngOnInit(): void {
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
    var id = localStorage.getItem('propertyIdEdit');
    if( id != null )
    {
      this.service.getProperty(id).subscribe(res => {
        this.service.formData.Id = id;
        this.service.formData.Price = (res as any).Data[0].Price;
        this.service.formData.Description = (res as any).Data[0].Description;
        this.service.formData.Direction = (res as any).Data[0].Direction;
        this.service.formData.Size = (res as any).Data[0].Size;
        this.service.formData.Bedrooms = (res as any).Data[0].Bedrooms;
        this.service.formData.Bathrooms = (res as any).Data[0].Bathrooms;
        this.longInitial = Number((res as any).Data[0].Latitude);
        this.latInitial = Number((res as any).Data[0].Longitude);
        this.service.formData.State = (res as any).Data[0].State;
        this.service.formData.Category = (res as any).Data[0].Category;
        this.service.formData.TypeProperty = (res as any).Data[0].TypeProperty;
        this.service.formData.UserIdPro = (res as any).Data[0].User.Id;
        this.service.formData.imagen64portada = (res as any).Data[0].imagen64portada;
        this.mapa.setCenter([this.latInitial, this.longInitial]);
        this.crearMarcador(this.longInitial, this.latInitial);
        if (this.service.formData.imagen64portada != null){
          localStorage.setItem('MiImagen', this.service.formData.imagen64portada); 
        }
      });
    }
    else{
      this.crearMarcador(this.longInitial, this.latInitial);
    }
    this.resetForm();
  }
  crearMarcador(long,lat) {
    const marker = new mapboxgl.Marker({
    draggable: true
    })
    .setLngLat([this.latInitial, this.longInitial])
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
      Latitude:'',
      Longitude: '',
      Category: 1,
      TypeProperty: 1,
      UserIdPro: null,
      imageurl: '',
      imagen64portada:'',
    }
  }

  refreshData() {
    this.service.refreshList().subscribe((result: PropertyList) => {
    });
  }

  onSubmit(form: NgForm) {
    this.service.formData.Latitude = String(PropertyFormComponent.latitud);
    this.service.formData.Longitude = String(PropertyFormComponent.longitud);
    if(this.service.formData.Latitude=='undefined' && this.service.formData.Longitude=='undefined')
    {
      this.service.formData.Latitude=String(this.latInitial);
      this.service.formData.Longitude=String(this.latInitial);
    }
    var category = Number(this.service.formData.Category);
    var type = Number(this.service.formData.TypeProperty);
    this.service.formData.TypeProperty = type;
    this.service.formData.Category = category;
    if (localStorage.getItem('MiImagen') == null){
      this.service.formData.imagen64portada = localStorage.getItem('filename');
      this.service.formData.imageurl = localStorage.getItem('base64');
    }else{
      this.service.formData.imageurl = localStorage.getItem('MiImagen');
    }
    if (this.service.formData.Id == null){
      this.insertRecord(form);
    }
    else{this.updateRecord(form); }
    }

  updateRecord(form: NgForm) {
    this.service.putProperty().subscribe(
      res => {
        this.toastr.info('Datos guardados', 'Su propiedad editada se guardo correctamente');
        this.refreshData();
        localStorage.removeItem('base64');
        localStorage.removeItem('filename');
        localStorage.removeItem('MiImagenPro');
        localStorage.removeItem('MiImagen');
        this.resetForm(form);
        this._routes.navigate(['/propiedades']);
        localStorage.removeItem('propertyIdEdit');
      },
      err => {
        console.log(err);
      }
    )
  }
  insertRecord(form: NgForm) {
    this.service.postProperty().subscribe(
      res => {
        this.toastr.info('Datos guardados', 'Su propiedad se guardo correctamente');
        this.refreshData();
        localStorage.removeItem('base64');
        localStorage.removeItem('filename');
        localStorage.removeItem('MiImagenPro');
        localStorage.removeItem('MiImagen');
        this.resetForm(form);
        this._routes.navigate(['/propiedades']);
      },
      err => { console.log(err); }
    );
  }

cancelar(){
  this._routes.navigate(['/propiedades']);
  localStorage.removeItem('propertyIdEdit');
  localStorage.removeItem('MiImagenPro');
  localStorage.removeItem('MiImagen');
}
  uploadImage(event:any):void{
    this.imagen = event.target.files[0];
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
    if (event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any)=> {
        this.url = event.target.result;
      }
    }
    this.currentId = field;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      if (field == 1) {
        this.sellersPermitFile = file;
        this.handleInputChange(file); // turn into base64
      }
      else if (field == 2) {
        this.DriversLicenseFile = file;
        this.handleInputChange(file); // turn into base64
      }
      else if (field == 3) {
        this.InteriorPicFile = file;
        this.handleInputChange(file); // turn into base64
      }
      else if (field == 4) {
        this.ExteriorPicFile = file;
        this.handleInputChange(file); // turn into base64

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
    localStorage.setItem('base64', base64result);
    localStorage.setItem('MiImagen', base64result);
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
        break;
    }


  }



}

function foo(e) {
  // tslint:disable-next-line: whitespace
  PropertyFormComponent.latitud=String(e.lngLat['lat']);
  PropertyFormComponent.longitud=String(e.lngLat['lng']);
}