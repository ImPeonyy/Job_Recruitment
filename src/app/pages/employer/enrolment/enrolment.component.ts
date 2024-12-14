import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Enrolment } from '../../../models/enrolment/enrolment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-enrolment',
  templateUrl: './enrolment.component.html',
  styleUrl: './enrolment.component.css'
})
export class EnrolmentComponent implements OnInit, AfterViewInit{

  constructor() {

  }

  public enrolment: Enrolment[];

  ngOnInit() {
    
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['ID', 'name','email','phone_number','state','action'];

  dataSource = new MatTableDataSource<any>;
  clickedRows = new Set<Enrolment>();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
