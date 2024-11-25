import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { JobService } from '../../../services/job/job.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from '../../../models/job/job';
import { PutJobComponent } from '../put-job/put-job.component';
import { PostJobComponent } from '../post-job/post-job.component';
import { CloudsService } from '../../../services/clouds/clouds.service';
import { PostJobValueComponent } from '../post-job-value/post-job-value.component';
import { PutJobValueComponent } from '../put-job-value/put-job-value.component';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit, AfterViewInit {

  constructor(private js: JobService, 
    private dialogRef: MatDialog,
    private cls: CloudsService,
    private _liveAnnouncer: LiveAnnouncer) {

  }

  public job: Job;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getListJob();
  }

  
  
  displayedColumns: string[] = ['ID', 'title','min_salary','name','date_expired','action'];

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
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  openPostJobForm() {
    this.dialogRef.open(PostJobComponent, {
      height: '1000px',
      width: '640px'
    });
  }

  openPutJobForm(job: Job) {
    this.dialogRef.open(PutJobComponent, {
      height: '1000px',
      width: '640px'
    });
    this.getSelectedJob(job);
  }

  openDetailJobForm(job: Job) {
    this.dialogRef.open(PutJobComponent, {
      height: '1000px',
      width: '640px'
    });
    this.getSelectedJob(job);
  }

  deleteJob(job: Job) {
    this.js.delete(job.ID).subscribe(
    );
    location.reload();
  }

  openPutJob_ValueForm(job: Job) {
    this.dialogRef.open(PutJobValueComponent, {
      height: '1000px',
      width: '640px'
    });
    this.getSelectedJob(job);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
