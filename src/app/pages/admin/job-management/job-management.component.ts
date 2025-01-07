import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from '../../../models/job/job';
import { CloudsService } from '../../../services/clouds/clouds.service';
import { JobService } from '../../../services/job/job.service';
import { PutJobComponent } from '../../employer/put-job/put-job.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-job-management',
  templateUrl: './job-management.component.html',
  styleUrl: './job-management.component.css'
})
export class JobManagementComponent implements OnInit, AfterViewInit{

  constructor(private js: JobService, private dialogRef: MatDialog, private cls: CloudsService) {
  
    }

    id = 0;
  
    ngOnInit() {
      this.getListJob();
    }
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    
    displayedColumns: string[] = ['ID', 'title','min_salary','company_name','date_expired', 'state', 'action'];
  
    dataSource = new MatTableDataSource<any>;
    clickedRows = new Set<Job>();

    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
    }
  
    getSelectedJob(job: Job) {
      this.cls.selectedJob$.next(job);
    }
  
    getListJob() {
      this.js.getJobIndexDesc().subscribe({
        next: (res) => {
          console.log(res);
          this.dataSource.data = res;
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

    deleteJob(job: Job) {
      if(confirm('Are you sure you want to delete this job?')) {
        this.js.delete(job.ID).subscribe();
        location.reload();
      }
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}
