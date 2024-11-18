import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { JobService } from '../../../services/job/job.service';
import { Job } from '../../../models/job/job';
import { PutJobComponent } from '../../employer/put-job/put-job.component';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit  {

  constructor(private http: JobService, private dialogRef: MatDialog) {

  }

  ngOnInit() {
    this.getListJob();
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  displayedColumns: string[] = ['ID', 'title','min_salary','name','date_expired','action'];

  dataSource = new MatTableDataSource<any>;
  clickedRows = new Set<Job>();

  getSelectedJob(job: Job) {
    this.http.selectedJob$.next(job);
  }

  getListJob() {
    this.http.getJobIndexDesc().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  openPutJobForm(job: Job) {
    this.dialogRef.open(PutJobComponent, {
      height: '1000px',
      width: '640px'
    });
    console.log(this.getSelectedJob(job));
    // console.log(emp);
    
  }
}
