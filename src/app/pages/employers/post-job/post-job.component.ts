import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job/job.service';
import { Job } from '../../../models/job/job';
import { TypeOfJob } from '../../../models/type_of_job/type-of-job';
import { Company } from '../../../models/company/company';
import { Province } from '../../../models/province/province';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent implements OnInit {

  constructor(private http: JobService) {

  }

  public job: Job;
  public $company: Company[];
  public $location: Province[];
  public $job_type: TypeOfJob[];

  ngOnInit() {
    this.initializeEmployee();
    this.http.getCompany().subscribe(res => {
      this.$company = res;
    });

    this.http.getLocation().subscribe(res => {
      this.$location = res;
    });

    this.http.getTypeofJob().subscribe(res => {
      this.$job_type = res;
    });
  }

  initializeEmployee() {
    this.job = {
      ID : 0,
      title: '',
      company : null,
      location : null,
      address: '',
      job_des: '',
      job_req: '',
      date_expired: null,
      welfare: '',
      job_title: '',
      job_type: null
    };
  }

  post( ): void {
    this.http.post(this.job).subscribe(
      (res: any) => {
        console.log(this.job);
        console.log(res); // Log the response for debugging
        this.initializeEmployee();
        alert('Post job successfully!');
      },
      (err: any) => {
        console.error('Đã xảy ra lỗi:', err); // Log any errors for debugging
        alert('Post job fail!');
        console.log(this.job);
      }
    );
  }

}
