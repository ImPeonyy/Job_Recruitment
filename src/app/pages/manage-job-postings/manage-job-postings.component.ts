import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from '../../models/job/job';
import { JobService } from '../../services/job/job.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-manage-job-postings',
  templateUrl: './manage-job-postings.component.html',
  styleUrl: './manage-job-postings.component.css'
})
export class ManageJobPostingsComponent implements OnInit {

  constructor(private http: JobService) {

  }

  ngOnInit() {
    this.getListJob();
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['ID', 'title','min_salary','name','date_expired','action'];
  dataSource = new MatTableDataSource<any>;
  clickedRows = new Set<Job>();

  getListJob() {
    this.http.getJobIndexDesc().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      }
    })
  }
}
