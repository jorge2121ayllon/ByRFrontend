import { PropertyService } from '../../servicios/property.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';
import {PropertyList} from 'src/app/modelos/property-list.model';
import { Subscription } from 'rxjs';
import {  ViewChild, TemplateRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {GaleriaService} from '../../servicios/galeria.service';
import { Galeria } from 'src/app/modelos/galeria.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styles: [
  ]
})
export class PropertyListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  @ViewChild("myModalInfo", {static: false}) myModalInfo: TemplateRef<any>;
  @ViewChild("myModalConf", {static: false}) myModalConf: TemplateRef<any>;
  url="https://kinsta.com/es/wp-content/uploads/sites/8/2018/02/leyenda-de-wordpress-1.png";
  private imagen:any;
  imagePath:string="";
  list: Galeria[];

  constructor(public service: PropertyService,private toastr: ToastrService,
                  private modalService: NgbModal,public galeriaService: GaleriaService,
                  private _routes:Router) { }
  public Categories = [

    { value: 1, display: 'Venta' },
    { value: 2, display: 'Alquiler' },
    { value: 3, display: 'Anticretico' }
];

public TypeProperties = [
  { value: 1, display: 'Vivienda' },
  { value: 2, display: 'Terreno' }
];

  mostrarModalInfo(id){
  this.modalService.open(this.myModalInfo);
      this.GetImages(id);
  localStorage.setItem('propertyId',id);
  }

  savedImage(){
    this.service.postSaveImage().subscribe(
      res => {
        this.toastr.info('Imagen Guardada', 'Agregó correctamente la imagen de la propiedad');
        this.refreshData();
        localStorage.removeItem('base64');
        localStorage.removeItem('propertyId');
        localStorage.removeItem('filename');
        this.modalService.dismissAll();
      }
    );
  }
  ngOnInit(): void {
    this.refreshData();
  }
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
    
  }
  refreshData() {
    this.service.refreshList().subscribe((result: PropertyList) => {
      
    });
    this.url="https://kinsta.com/es/wp-content/uploads/sites/8/2018/02/leyenda-de-wordpress-1.png";
  }
  GetImages(id){
    this.service.GetGalleryByPropertyId(id);

  }
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.filterData.Columna = column;
    this.service.filterData.Direccion = direction;
    this.refreshData();
  }
  onDelete(id) {
    if (confirm('Estas seguro de eliminar ?')) {
      this.service.deleteProperty(id)
        .subscribe(res => {
          this.refreshData();
        },
          err => { console.log(err); })
    }
  }
  pageChanged(page: number) {
    this.service.filterData.Pagina = page;
    this.refreshData();
  }

  pageSizeChanged(pageSize: number) {
    this.service.filterData.TamPagina = pageSize;
    this.refreshData();
  }

  filterData(filtro: string) {
    this.service.filterData.Filtro = filtro;
    this.service.filterData.Pagina = 1;
    this.refreshData();
  }

  

  //IMAGEN
  
  //probando
  imageSrc;
  sellersPermitFile: any;
  DriversLicenseFile: any;
  InteriorPicFile: any;
  ExteriorPicFile: any;
  //base64s
  sellersPermitString: string;
  DriversLicenseString: string;
  InteriorPicString: string;
  ExteriorPicString: string;
  //json
  finalJson = {};

  currentId: number = 0;

  addPictures() {
    this.finalJson = {
      "sellersPermitFile": this.ExteriorPicString,
      "DriversLicenseFile": this.DriversLicenseString,
      "InteriorPicFile": this.InteriorPicString,
      "ExteriorPicFile": this.ExteriorPicString
    }
  }
  public picked(event, field) {
    if (event.target.files){
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any)=> {
        this.url = event.target.result;
      }
    }
    this.currentId = field;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
   
      if (field == 1) {
        this.sellersPermitFile = file;
        this.handleInputChange(file); //turn into base64
      }
      else if (field == 2) {
        this.DriversLicenseFile = file;
        this.handleInputChange(file); //turn into base64
      }
      else if (field == 3) {
        this.InteriorPicFile = file;
        this.handleInputChange(file); //turn into base64
      }
      else if (field == 4) {
        this.ExteriorPicFile = file;
        this.handleInputChange(file); //turn into base64

      }
    }
    else {
      alert("No file selected");
    }
  }

  handleInputChange(files) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);    
    reader.readAsDataURL(file);
    localStorage.setItem('filename',file.name);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    localStorage.setItem('base64',base64result);
    let id = this.currentId;
    switch (id) {
      case 1:
        this.sellersPermitString = base64result;        
        break;
      case 2:
        this.DriversLicenseString = base64result;
        break;
      case 3:
        this.InteriorPicString = base64result;
        break;
      case 4:
        this.ExteriorPicString = base64result;
        break
    }

    //this.log();
  }

  getPropertyDetail(id){
  
    localStorage.setItem('propertyId',id);    
    this._routes.navigate(['/propiedadDetalle']);
  }
  getPropertyEdit(id){
    localStorage.setItem('propertyIdEdit', id);
    console.log(localStorage.getItem('propertyIdEdit'));
    this._routes.navigate(['/propiedad']);
  }
  deleteImage(id){
    if (confirm('Estas seguro de eliminar ?')) {
      this.galeriaService.deleteGallery(id)
        .subscribe(res => {
          this.GetImages(localStorage.getItem('propertyId'));
        },
          err => { console.log(err); })
    }
  }
  //mostrar las fotos guardadas en la bdd
    public mostrarfotos(){
        var imagenMostrar="";

    }

    
}