import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageAndSort } from '../modelos/pageandsort.model';
import { Property } from '../modelos/property.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropertyList}  from '../modelos/property-list.model';

import { Galeria } from '../modelos/galeria.model';
import { PropertyListuser } from '../modelos/property-listuser.model';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  formData: Property;
  filterData: PageAndSort;
  list: Property[];
  list2: Property[];
  listGaleria: Galeria[];
  totalRows: number;
  PropertyId: string;
  listaPropiedadesMapa= new PropertyList();
  constructor(private http: HttpClient, private _router: Router ) {
    this.filterData = new PageAndSort();
    this.filterData.Columna = 'Id';
    this.filterData.Direccion = 'asc';
    this.filterData.Pagina = 1;
    this.filterData.TamPagina = 10;
    this.filterData.Filtro = '';
   // this.formData.UserIdPro = localStorage.getItem('UserId');
  }


  getProperty(id: string): Observable<PropertyList>{
    const self = this;

    return this.http.get(`${environment.apiUrl}Properties/${id}`).pipe(map((data: PropertyList ) => {
      self.list = data.Data;
      self.totalRows = data.TotalRows;
      return data;
    }));

  }

  getPropertyuser(id: string): Observable<PropertyListuser>{
    const self = this;

    return this.http.get(`${environment.apiUrl}Properties/${id}`).pipe(map((data: PropertyListuser ) => {
      self.list = data.Data;
      self.totalRows = data.TotalRows;
      return data;
    }));

  }

  postSaveImage(){
   this.formData = new Property();
   this.formData = {
      Id: null,
      Price: 0,
      Bedrooms: 0,
      Bathrooms: 0,
      Size: 0,
      Direction: 'sdasd',
      State: false,
      Description: 'asdasd',
      Latitude: '',
      Longitude: '',
      Category: 1,
      TypeProperty: 1,
      UserIdPro: '',
      imageurl: '',
      imagen64portada: ''
    };

   this.formData.Id = localStorage.getItem('propertyId');
   this.formData.imageurl = localStorage.getItem('base64');
   console.log(this.formData);
   return this.http.post(`${environment.apiUrl}Properties/PostSavedImage`, this.formData);
  }

  postProperty() {
    this.formData.UserIdPro = localStorage.getItem('UserId');
    return this.http.post(`${environment.apiUrl}Properties`, this.formData);
  }

  putProperty() {
    this.formData.UserIdPro = localStorage.getItem('UserId');
    return this.http.put(`${environment.apiUrl}Properties`, this.formData);
  }
  serchProperties(serch: string, preciodesde: number, preciohasta: number, tamaniodesde2: number,
                  tamaniohasta2: number, ncuartos2: number, nbanios2: number){
    const self = this;
    console.log('desde el servicio -> '+ serch);
    return this.http.get(`${environment.apiUrl}Properties/GetPropertyByUserBuyer`
    + '?serch=' + serch + '&preciodesde=' + preciodesde + '&preciohasta=' + preciohasta + '&tamaniodesde=' + tamaniodesde2
    + '&tamaniohasta=' + tamaniohasta2 + '&ncuartos=' + ncuartos2 + '&nbanios=' + nbanios2)
    .pipe(map((data: PropertyList ) => {
      self.list = data.Data;
      self.totalRows = data.TotalRows;
      this.listaPropiedadesMapa.Data = data.Data;
      this.listaPropiedadesMapa.TotalRows=data.TotalRows;
      return data;
    }));
  }

  deleteProperty(id) {
    this.formData.UserIdPro = localStorage.getItem('UserId');
    return this.http.delete(`${environment.apiUrl}Properties/${id}`);
  }
  refreshList(): Observable<PropertyList> {
    const self = this;
    return this.http.get(`${environment.apiUrl}Properties` +
      '?column=' + this.filterData.Columna +
      '&direction=' + this.filterData.Direccion +
      '&page=' + this.filterData.Pagina +
      '&pagesize=' + this.filterData.TamPagina +
      '&filter=' + this.filterData.Filtro +
      '&id=' + localStorage.getItem('UserId'))
      .pipe(map((data: PropertyList ) => {
        console.log(data);
        self.list = data.Data;
        self.totalRows = data.TotalRows;
        return data;
      }));
  }

  propertiesInit(): Observable<PropertyList>{
    const self2 = this;

    return this.http.get(`${environment.apiUrl}Properties/GetPropertiesInit`)
    .pipe(map((data: PropertyList) =>{
        self2.list = data.Data;
        self2.totalRows = data.TotalRows;
        return data;
    }));
  }

  Search(filtro) {
    this.filterData.Filtro = filtro;
    this.refreshList();
    }
    Quantity(cantidad) {
      this.filterData.TamPagina = cantidad;
      this.refreshList();
      }
    Previus() {
      this.filterData.Pagina = this.filterData.Pagina - 1;
      this.refreshList();
      }
    Next() {
        this.filterData.Pagina = this.filterData.Pagina + 1;
        this.refreshList();
      }

    GetGalleryByPropertyId(id){
      return this.http.get(`${environment.apiUrl}Galleries/${id}`)
      .toPromise()
      .then(res => this.listGaleria = (res as any) as Galeria[]);

    }
}
