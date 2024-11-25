import { Component, OnInit } from '@angular/core';
import { JobValueService } from '../../../services/job_value/job-value.service';
import { CloudsService } from '../../../services/clouds/clouds.service';
import { JobValue } from '../../../models/job_value/job-value';
import { Job } from '../../../models/job/job';

@Component({
  selector: 'app-put-job-value',
  templateUrl: './put-job-value.component.html',
  styleUrl: './put-job-value.component.css'
})
export class PutJobValueComponent implements OnInit {

  constructor(private jvs: JobValueService, private cls: CloudsService) {

  }

  public job_value: JobValue;
  public job: Job;

  ngOnInit() {
    this.cls.selectedJob$.subscribe(res => {
      this.job = res;
      console.log('job: ', this.job);
    })
    this.jvs.getByID(this.job.ID).subscribe(res => {
      this.job_value = res;
      console.log('job value: ', this.job_value);
    })
    this.initializeJob_Value();
  }

  initializeJob_Value() {
    this.job_value = {
      ID : this.job_value.ID,
      min_salary: null,
      max_salary : null,
      min_exp : null,
      max_exp: null
    };
  }

  post( ): void {
    this.jvs.post(this.job_value).subscribe(
      (res: any) => {
        // this.initializeJob_Value();
        alert('Put job value successfully!');
      },
      (err: any) => {
        console.error('Đã xảy ra lỗi:', err); // Log any errors for debugging
        alert('Put job value fail!');
      }
    );
  }
}
