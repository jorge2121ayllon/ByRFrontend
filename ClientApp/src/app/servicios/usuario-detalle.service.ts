import { UsuarioDetalle } from '../modelos/usuario-detalle.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PageAndSort } from '../modelos/pageandsort.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioDetalleService {
  formData: UsuarioDetalle;
  filterData: PageAndSort;
   //readonly rootURL = 'http://AyllonPedidos.somee.com/api';
  /// //readonly rootURL = 'http://localhost:52521/api';
  list: UsuarioDetalle[];

  constructor(private http: HttpClient,private _router:Router ) {
    this.filterData = new PageAndSort();
    this.filterData.Columna = "Id";
    this.filterData.Direccion = "asc";
    this.filterData.Pagina = 1;
    this.filterData.TamPagina = 10;
    this.filterData.Filtro = "";
  }

      
     getToken(){
      return localStorage.getItem('Token');
    }

  loggedIn(){
    return !!localStorage.getItem('UserId');
  }

  getUserId(){
    return localStorage.getItem('UserId');
  }
  logoutUser(){
      localStorage.removeItem('UserId');
      this._router.navigate(['/inicio']);
 }


 postUsuario() {
  return this.http.post(`${environment.apiUrl}Users`, this.formData);
}
putUsuario() {
  return this.http.put(`${environment.apiUrl}Users/${this.formData.Id}`, this.formData);
}
deleteUsuario(id) {
  return this.http.delete(`${environment.apiUrl}Users/${id}`);
}

authUsuarios(nombre, clave){
  return this.http.get(`${environment.apiUrl}Users/${nombre}/${clave}`);
}

refreshList() {
  this.http.get( `${environment.apiUrl}Users` + '?columna=' + this.filterData.Columna +
    '&direccion=' + this.filterData.Direccion +
    '&pagina=' + this.filterData.Pagina +
    '&tampagina=' + this.filterData.TamPagina +
    '&filtro=' + this.filterData.Filtro)
    .toPromise()
    .then(res => this.list = (res as any).Datos as UsuarioDetalle[]);
}

}
