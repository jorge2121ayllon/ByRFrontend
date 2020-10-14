import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs"; 
import {Galeria} from "../modelos/galeria.model";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  constructor(private http: HttpClient, private _router: Router) { }

    

}
