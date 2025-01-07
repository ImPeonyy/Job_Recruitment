import { Component, OnInit } from '@angular/core';
import { CloudsService } from '../../../services/clouds/clouds.service';
import { Job_Index } from '../../../models/job_index/job-index';
import { MatDialog } from '@angular/material/dialog';
import { UploadCvComponent } from '../../employee/upload-cv/upload-cv.component';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent implements OnInit {

  jobIndex: Job_Index;

  constructor(private cls: CloudsService, private dialogRef: MatDialog) {

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.jobIndex = this.cls.get('currJob');
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
}
