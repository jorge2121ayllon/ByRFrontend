import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageAndSort } from '../modelos/pageandsort.model';
import { Property } from '../modelos/property.model';
import { Observable } from "rxjs"; 
import { map } from "rxjs/operators"; 
import { PropertyList}  from '../modelos/property-list.model';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  
  formData: Property;
  filterData: PageAndSort;
  list: Property[];
  totalRows: number;
  constructor(private http: HttpClient, private _router: Router ) {
    this.filterData = new PageAndSort();
    this.filterData.Columna = "Id";
    this.filterData.Direccion = "asc";
    this.filterData.Pagina = 1;
    this.filterData.TamPagina = 10;
    this.filterData.Filtro = "";
   // this.formData.UserIdPro = localStorage.getItem('UserId');
  }

  postProperty() {
    this.formData.UserIdPro = localStorage.getItem('UserId');

    return this.http.post(`${environment.apiUrl}Properties`, this.formData);
  }

  putProperty() {
    this.formData.UserIdPro = localStorage.getItem('UserId');
    return this.http.put(`${environment.apiUrl}Properties`, this.formData);
  }

  deleteProperty(id) {
    this.formData.UserIdPro = localStorage.getItem('UserId');
    return this.http.delete(`${environment.apiUrl}Properties/${id}`);
  }
  refreshList() : Observable<PropertyList> {
    let self = this;
    return this.http.get(`${environment.apiUrl}Properties` +
      '?column=' + this.filterData.Columna +
      '&direction=' + this.filterData.Direccion +
      '&page=' + this.filterData.Pagina +
      '&pagesize=' + this.filterData.TamPagina +
      '&filter=' + this.filterData.Filtro +
      '&id=' + localStorage.getItem('UserId'))
      .pipe(map((data: PropertyList ) => {
        self.list = data.Data;
        self.totalRows = data.TotalRows;
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
}
