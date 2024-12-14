import { Component, OnInit } from '@angular/core';
import { JobValueService } from '../../../services/job_value/job-value.service';
import { JobValue } from '../../../models/job_value/job-value';
import { CloudsService } from '../../../services/clouds/clouds.service';
import { Job } from '../../../models/job/job';

@Component({
  selector: 'app-post-job-value',
  templateUrl: './post-job-value.component.html',
  styleUrl: './post-job-value.component.css'
})
export class PostJobValueComponent implements OnInit {

  constructor(private jvs: JobValueService, private cls: CloudsService) {

  }

  public job_value: JobValue;
  public job: Job;

  ngOnInit() {
    this.cls.selectedJob$.subscribe(res => {
      this.job = res;
    })
    this.initializeJob_Value();
  }

  initializeJob_Value() {
    this.job_value = {
      ID : this.job.ID,
      min_salary: null,
      max_salary : null,
      min_exp : null,
      max_exp: null
    };
  }

  post( ): void {
    this.jvs.post(this.job_value).subscribe(
      (res: any) => {
        this.initializeJob_Value();
        location.reload();
      },
      (err: any) => {
        console.error('Đã xảy ra lỗi:', err); // Log any errors for debugging
        location.reload();
      }
    );
  }
}
