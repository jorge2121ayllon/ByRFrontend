import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageAndSort } from '../modelos/pageandsort.model';
import { User } from '../modelos/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: User;
  filterData: PageAndSort;
  list: User[];

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

  loggedAdministrator()
  {
    if (localStorage.getItem('Role') == "administrador") {
      return true;
    }
    return false;
  }
  
  loggedVendor()
  {
    if (localStorage.getItem('Role') == "vendedor") {
      return true;
    }
    return false;
  }
  
  loggedBuyer()
  {
    if (localStorage.getItem('Role') == "comprador") {
      return true;
    }
    return false;
  }


  getUserId(){
    return localStorage.getItem('UserId');
  }

  logoutUser(){
    localStorage.removeItem('UserId');
    localStorage.removeItem('Role');
    this._router.navigate(['/inicio']);
  }


  

   postUser() {
    return this.http.post(`${environment.apiUrl}Users`, this.formData);
  }

  putUser() {
    return this.http.put(`${environment.apiUrl}Users/${this.formData.Id}`, this.formData);
  }

  deleteUser(id) {
    return this.http.delete(`${environment.apiUrl}Users/${id}`);
  }

  authUser(email, clave){
    return this.http.get(`${environment.apiUrl}Users/${email}/${clave}`);
  }

  refreshList() {
    this.http.get( `${environment.apiUrl}Users` + '?columna=' + this.filterData.Columna +
      '&direccion=' + this.filterData.Direccion +
      '&pagina=' + this.filterData.Pagina +
      '&tampagina=' + this.filterData.TamPagina +
      '&filtro=' + this.filterData.Filtro)
      .toPromise()
      .then(res => this.list = (res as any).Datos as User[]);
  }

}
