import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Job } from '../../models/job/job';
import { JobService } from '../../services/job/job.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PutJobComponent } from '../employer/put-job/put-job.component';
import { CloudsService } from '../../services/clouds/clouds.service';


@Component({
  selector: 'app-manage-job-postings',
  templateUrl: './manage-job-postings.component.html',
  styleUrl: './manage-job-postings.component.css'
})
export class ManageJobPostingsComponent implements OnInit {

  constructor(private js: JobService, private dialogRef: MatDialog, private cls: CloudsService) {

  }

  ngOnInit() {
    this.getListJob();
    this.loadJobs();
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

  loadJobs(): void {
    this.js.get().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error loading jobs:', error);
      }
    );
  }

  approveJob(job: any): void {
    const updatedJob = { ...job, status: 'Approved' }; // Update job status
    this.http.put(updatedJob).subscribe(
      () => {
        this.snackBar.open('Job approved successfully!', 'Close', { duration: 3000 });
        this.loadJobs();
      },
      (error) => {
        console.error('Error approving job:', error);
        this.snackBar.open('Failed to approve job!', 'Close', { duration: 3000 });
      }
    );
  }

  deleteJob(job: any): void {
    const confirmDelete = window.confirm(`Are you sure you want to delete the job with ID: ${job.ID}?`);
    if (confirmDelete) {
      this.http.delete(job.ID).subscribe(
        (response) => {
          this.snackBar.open(response || 'Job deleted successfully!', 'Close', { duration: 3000 });
          this.loadJobs(); // Refresh the job list
        },
        (error) => {
          console.error('Error deleting job:', error);
          this.snackBar.open('Failed to delete job!', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
