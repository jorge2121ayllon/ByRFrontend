import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
    selector: 'app-pager',
    templateUrl: './pagination.component.html',
    styleUrls: []
})
export class PaginationComponent implements OnInit {

    @Input() allowToChangePageSize: boolean = false;
    @Input() totalRows: number;
    @Input() itemsPerPage: number;
    @Output("pageChanged") pageChangedEvent = new EventEmitter<number>();
    @Output("pageSizeChanged") pageSizeChangedEvent = new EventEmitter<number>();

    currentPage: number;
    currentPageSize: number;
   
    constructor() { }

    isFirstPage() {
        return this.currentPage == 1;
    }
    isLastPage() {
        return this.currentPage == this.getTotalPages();
    }
    getTotalPages(){
      if (this.totalRows == 0) 
        return 1;
      else {
        let max = this.totalRows / this.itemsPerPage;
        return Math.ceil(max);
      }
    }
    ngOnInit() {
        this.currentPage = 1;
    }
    getDisplayingLabel() {
        if (this.currentPage == null || !this.itemsPerPage == null || !this.totalRows == null)
            return "";
        if (this.totalRows == 0)
            return "No hay datos a paginar";
        return `Mostrando la página ${this.currentPage} de ${this.getTotalPages() } páginas`;
    }
    goToFirstPage() {
        this.currentPage = 1;
        this.pageChangedEvent.emit(this.currentPage);
    }
    goToPreviousPage() {
        this.currentPage--;
        this.pageChangedEvent.emit(this.currentPage);
    }
    goToNextPage() {
        this.currentPage++;
        this.pageChangedEvent.emit(this.currentPage);
    }
    goToLastPage() {
        this.currentPage = this.getTotalPages();
        this.pageChangedEvent.emit(this.currentPage);
    }
    rowsPerPageChange() {
        this.currentPageSize = this.itemsPerPage;
        this.pageSizeChangedEvent.emit(this.currentPageSize);
    }
}
