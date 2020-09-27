import { PropertyService } from '../../servicios/property.service';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortColumns, SortEvent, SortColumn, SortDirection } from '../../directivas/sortcolumns';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styles: [
  ]
})
export class PropertyListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;
  constructor(public service: PropertyService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
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
    this.service.refreshList();
  }
  sort(column: SortColumn, direction: SortDirection) {
    if (direction === '' || column === '') {

    } else {
      this.service.refreshList();
    }
  }
  onDelete(id) {
    if (confirm('Estas seguro de eliminar ?')) {
      this.service.deleteProperty(id)
        .subscribe(res => {
          this.service.refreshList();
        },
          err => { console.log(err); })
    }
  }
  Search(filter) {
    // resetting other headers
    this.service.Search(filter);
  }
  Quantity(quantity) {
    // resetting other headers
    this.service.Quantity(quantity);
  }

  Previus(){
    this.service.Previus();
  }
  Next(){
    this.service.Next();
  }
}
