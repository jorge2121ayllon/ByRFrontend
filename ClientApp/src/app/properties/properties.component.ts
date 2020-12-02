import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styles: [
  ]
})
export class PropertiesComponent implements OnInit {

  constructor(private _routes: Router) { }

  ngOnInit(): void {
  }
  Eliminar(){
    this._routes.navigate(['/propiedad']);
    localStorage.removeItem('propertyIdEdit');
  }
}
