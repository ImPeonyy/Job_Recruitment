import { Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../../../services/job/job.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from '../../../models/job/job';
import { PutJobComponent } from '../put-job/put-job.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit {

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
