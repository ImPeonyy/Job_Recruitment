import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { Job_Index } from '../../models/job_index/job-index';
import { CloudsService } from '../../services/clouds/clouds.service';
import { Job } from '../../models/job/job';
import { MatDialog } from '@angular/material/dialog';
import { UploadCvComponent } from '../upload-cv/upload-cv.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  constructor(private js: JobService, private cls: CloudsService,
              private dialogRef: MatDialog, private router: Router
  ) {

  }

  public $job_index: Job_Index[];
  public $count_job_type: CountJobType[];
  public $count_location: CountLocation[];

  ngOnInit() {
    this.js.getJobIndexDesc().subscribe(res => {
      this.$job_index = res;
    });

    this.js.getJobTypeDesc().subscribe(res => {
      this.$count_job_type = res;
    });

    this.js.getLocationDesc().subscribe(res => {
      this.$count_location = res;
    });
  }

  setSelectedJob(job) {
    this.cls.selectedJob$.next(job);
  }

  applyJob(job) {
    this.dialogRef.open(UploadCvComponent, {
          height: '1000px',
          width: '640px'
        });
        this.setSelectedJob(job);
  }

  openJobDetail(jobIndex) {
    this.cls.jobIndex$.next(jobIndex);
    this.router.navigate(['job-detail']);
  }

}

export interface CountLocation {
  count: number;
  name: string;
}

export interface CountJobType {
  count: number;
  name: string;
}
