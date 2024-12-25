import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from '../../../models/job/job';
import { CloudsService } from '../../../services/clouds/clouds.service';
import { JobService } from '../../../services/job/job.service';
import { PutJobComponent } from '../../employer/put-job/put-job.component';

@Component({
  selector: 'app-job-management',
  templateUrl: './job-management.component.html',
  styleUrl: './job-management.component.css'
})
export class JobManagementComponent implements OnInit{

  constructor(private js: JobService, private dialogRef: MatDialog, private cls: CloudsService) {
  
    }
  
    ngOnInit() {
      this.getListJob();
    }
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    displayedColumns: string[] = ['ID', 'title','min_salary','name','date_expired','action'];
  
    dataSource = new MatTableDataSource<any>;
    clickedRows = new Set<Job>();
  
    getSelectedJob(job: Job) {
      this.cls.selectedJob$.next(job);
    }
  
    getListJob() {
      this.js.getJobIndexDesc().subscribe({
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
