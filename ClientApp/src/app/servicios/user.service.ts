import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PageAndSort } from '../modelos/pageandsort.model';
import { User } from '../modelos/user.model';
import { UserList } from '../modelos/user-list.model';
import { map } from "rxjs/operators"; 
import { Observable } from "rxjs"; 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: User;
  filterData: PageAndSort;
  list: User[];
  vendedor: User;
  totalRows: number;
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

  getNameUser()
  {
    return localStorage.getItem('NameUser');
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
    localStorage.removeItem('Token');
    localStorage.removeItem('NameUser');
    this._router.navigate(['/inicio']);
  }


  

  postUser() {
    return this.http.post(`${environment.apiUrl}Users`, this.formData);
  }

  putUser() {
    return this.http.put(`${environment.apiUrl}Users/${this.formData.Id}`, this.formData);
  }

  ObtenerVendedor(id) {
    return this.http.get(`${environment.apiUrl}Users/${id}`);
  }


  deleteUser(id) {
    return this.http.delete(`${environment.apiUrl}Users/${id}`);
  }

  authUser(email, clave){
    return this.http.get(`${environment.apiUrl}Users/${email}/${clave}`);
  }

  
  refreshList() : Observable<UserList> {
    let self = this;
    return this.http.get(`${environment.apiUrl}Users`+
      '?column='+this.filterData.Columna+
      '&direction='+this.filterData.Direccion+
      '&page='+this.filterData.Pagina+
      '&pagesize='+this.filterData.TamPagina+
      '&filter='+this.filterData.Filtro)
      .pipe(map((data: UserList) => {
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
