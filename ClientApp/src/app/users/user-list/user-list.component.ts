import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortColumns, SortEvent } from 'src/app/directivas/sortcolumns';
import { UserList } from 'src/app/modelos/user-list.model';
import { User } from 'src/app/modelos/user.model';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [
  ]
})
export class UserListComponent implements OnInit {
  @ViewChildren(SortColumns) headers: QueryList<SortColumns>;

  constructor(public service: UserService) { }

  ngOnInit(): void {
    this.refreshData();
  }

  onDelete(id) {
    if (confirm('Esta seguro de borrar el usuario?')) {
      this.service.deleteUser(id)
        .subscribe(res => {
          this.refreshData();
        },
          err => { console.log(err); })
    }
  }
  refreshData() {
    this.service.refreshList().subscribe((result: UserList) => {
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
    this.service.refreshList();
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
