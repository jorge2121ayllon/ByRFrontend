import { PropertyService } from '../../servicios/property.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styles: [
  ]
})
export class PropertyFormComponent implements OnInit {

  constructor(public service: PropertyService, private toastr: ToastrService) { }
  public Categories = [
      { value: '1', display: 'Venta' },
      { value: '2', display: 'Alquiler' },
      { value: '3', display: 'Anticretico' }
  ];
  public TypeProperties = [
    { value: '1', display: 'Vivienda' },
    { value: '2', display: 'Terreno' }
  ];
  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();
    this.service.formData = {
      Id: 'nulo',
      IsDelete: false,
      Price: null,
      Bedrooms: null,
      Badrooms: null,
      Size: null,
      Direction: '',
      State: false,
      Description: '',
      Latitude: '',
      Longitude: '',
      Category: null,
      TypeProperty: null,
      User: null
    }
  }
  onSubmit(form: NgForm) {
    
    if (this.service.formData.Id == 'nulo')
      this.insertRecord(form);
    else
      this.updateRecord(form);
    }
  updateRecord(form: NgForm) {
    this.service.putProperty().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.info('Submitted successfully', 'Detalles del tipo de empresa');
        this.service.refreshList();
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
        this.service.refreshList();
      },
      err => { console.log(err); }
    )
  }
  
}
