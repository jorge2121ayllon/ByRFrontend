import { PropertyService } from '../../servicios/property.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {PropertyList} from 'src/app/modelos/property-list.model';
@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styles: [
  ]
})
export class PropertyFormComponent implements OnInit {

  constructor(public service: PropertyService, private toastr: ToastrService,private _routes:Router) { }
  public Categories = [

      { value: 1, display: 'Venta' },
      { value: 2, display: 'Alquiler' },
      { value: 3, display: 'Anticretico' }
  ];

  public TypeProperties = [
    { value: 1, display: 'Vivienda' },
    { value: 2, display: 'Terreno' }
  ];
  ngOnInit(): void {
    
    this.resetForm();
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
      Latitude: '',
      Longitude: '',
      Category: 1,
      TypeProperty: 1,
      UserIdPro: null
    }
  }

  refreshData() {
    this.service.refreshList().subscribe((result: PropertyList) => {
    });
  }
  onSubmit(form: NgForm) {

    var category = Number(this.service.formData.Category);
    var type = Number(this.service.formData.TypeProperty);
    this.service.formData.TypeProperty = type;
    this.service.formData.Category = category;
    if (this.service.formData.Id == null){
      this.insertRecord(form);
      }

    else
      this.updateRecord(form);
    }
  updateRecord(form: NgForm) {
    this.service.putProperty().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Datos guardados', 'Su propiedad se actualizo correctamente');
        this.refreshData();
      },
      err => {
        console.log(err);
      }
    )
  }
  insertRecord(form: NgForm) {
    this.service.postProperty().subscribe(
      res => {
        this.resetForm(form); 
        this.toastr.info('Datos guardados', 'Su propiedad se guardo correctamente');
        this.refreshData();
      },
      err => { console.log(err); }
    )
  }
}
