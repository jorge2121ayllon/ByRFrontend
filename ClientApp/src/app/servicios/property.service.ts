import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageAndSort } from '../modelos/pageandsort.model';
import { Property } from '../modelos/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  formData: Property;
  filterData: PageAndSort;
  list: Property[];
  constructor(private http: HttpClient,private _router:Router ) {
    this.filterData = new PageAndSort();
    this.filterData.Columna = "Id";
    this.filterData.Direccion = "asc";
    this.filterData.Pagina = 1;
    this.filterData.TamPagina = 10;
    this.filterData.Filtro = "";
  }
  
  postProperty() {
    this.formData.UserIdPro = localStorage.getItem('UserId');
    
    return this.http.post(`${environment.apiUrl}Properties`, this.formData);
  }

  putProperty() {
    this.formData.UserIdPro = localStorage.getItem('UserId');
    return this.http.put(`${environment.apiUrl}Properties/${this.formData.Id}`, this.formData);
  }

  deleteProperty(id) {
    this.formData.UserIdPro = localStorage.getItem('UserId');
    return this.http.delete(`${environment.apiUrl}Properties/${id}`);
  }
  refreshList() {
    this.http.get( `${environment.apiUrl}Properties` + '?column=' + this.filterData.Columna +
      '&direction=' + this.filterData.Direccion +
      '&page=' + this.filterData.Pagina +
      '&pagesize=' + this.filterData.TamPagina +
      '&filter=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as Property[]);
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
      this.filterData.Pagina= this.filterData.Pagina-1;
      this.refreshList();  
      }
  
    Next() {
        this.filterData.Pagina=this.filterData.Pagina+1;
        this.refreshList();
      }
}
