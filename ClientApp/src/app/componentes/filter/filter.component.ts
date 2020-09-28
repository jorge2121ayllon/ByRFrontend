import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styles: []
})
export class FilterComponent implements OnInit {
  @Output("filterChanged") filterChangedEvent = new EventEmitter<string>();
  filter: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  filterData() {
    this.filterChangedEvent.emit(this.filter);
  }

  clearFilter() {
    this.filter = '';
    this.filterChangedEvent.emit(this.filter);
  }
}
