import { PropertyService } from '../../servicios/property.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import {PropertyList} from 'src/app/modelos/property-list.model';
import { map } from 'rxjs/operators';
import { Property } from 'src/app/modelos/property.model';
@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styles: [
  ]
})
export class PropertyFormComponent implements OnInit {


  propertyData : Property;
  public myform: FormGroup;
  public form: FormGroup;
  formPrice: string;
  productoId: string;
  formDescripcion: string;
  property: [];
  constructor(public service: PropertyService, private toastr: ToastrService, private _routes: Router, private avRoute: ActivatedRoute) {
    const idParam = 'id';
    this.propertyData = new Property();
    this.formDescripcion = 'Descripcion';
    this.formPrice = 'Price';
    if (this.avRoute.snapshot.params[idParam]){
      this.productoId = this.avRoute.snapshot.params[idParam];
    }
   }
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
    if( this.productoId != null )
    {
      this.service.getProperty(this.productoId).subscribe(res =>{
        this.service.formData.Price = (res as any).Price;
        this.service.formData.Description = (res as any).Description;
        this.service.formData.Direction = (res as any).Direction;
        this.service.formData.Size = (res as any).Size;
        this.service.formData.Bedrooms = (res as any).Bedrooms;
        this.service.formData.Bathrooms = (res as any).Bathrooms;
        this.service.formData.Latitude = (res as any).Latitude;
        this.service.formData.Longitude = (res as any).Longitude;
        this.service.formData.State = (res as any).State;
        this.service.formData.Category = (res as any).Category;
        this.service.formData.TypeProperty = (res as any).TypeProperty;
       
      });
    }
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
        this.toastr.info('Datos guardados', 'Su propiedad editada se guardo correctamente');
        this.refreshData();
        this._routes.navigate(['/propiedades']);
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
        this._routes.navigate(['/propiedades']);
      },
      err => { console.log(err); }
    )
  }

  get price(){ return this.form.get(this.formPrice); }
  get descripcion(){ return this.form.get(this.formDescripcion); }
}
