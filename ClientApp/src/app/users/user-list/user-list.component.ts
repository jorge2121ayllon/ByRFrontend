import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortColumns, SortEvent } from 'src/app/directivas/sortcolumns';
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
    this.service.refreshList();
  }

  
  populateForm(selectedRecord) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  
  onDelete(id) {
    if (confirm('Esta seguro de borrar el usuario?')) {
      this.service.deleteUser(id)
        .subscribe(res => {
          this.service.refreshList();
        },
          err => { console.log(err); })
    }
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


}
