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

  getUserId(){
    return localStorage.getItem('UserId');
  }

  logoutUser(){
    localStorage.removeItem('UserId');
    this._router.navigate(['/inicio']);
  }


   postUser() {
    this.formData.Id = "12345669898"; //esto cambiar
    return this.http.post(`${environment.apiUrl}Users`, this.formData);
  }

  putUser() {
    return this.http.put(`${environment.apiUrl}Users/${this.formData.Id}`, this.formData);
  }

  deleteUser(id) {
    return this.http.delete(`${environment.apiUrl}Users/${id}`);
  }

  authUser(nombre, clave){
    return this.http.get(`${environment.apiUrl}Users/${nombre}/${clave}`);
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
