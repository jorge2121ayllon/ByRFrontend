import { PropertyService } from '../../servicios/property.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortColumns, SortEvent } from '../../directivas/sortcolumns';
import {PropertyList} from 'src/app/modelos/property-list.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styles: [
  ]
})
export class PropertyListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;

  constructor(public service: PropertyService) { }
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
    this.refreshData();
  }
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
    
  }
  refreshData() {
    this.service.refreshList().subscribe((result: PropertyList) => {
      
    });
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
}
