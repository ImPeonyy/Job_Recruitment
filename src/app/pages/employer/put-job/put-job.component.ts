import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job/job.service';
import { Job } from '../../../models/job/job';
import { Company } from '../../../models/company/company';
import { Province } from '../../../models/province/province';
import { TypeOfJob } from '../../../models/type_of_job/type-of-job';
import { CloudsService } from '../../../services/clouds/clouds.service';

@Component({
  selector: 'app-put-job',
  templateUrl: './put-job.component.html',
  styleUrl: './put-job.component.css'
})
export class PutJobComponent implements OnInit {
  constructor(private js: JobService, private cls: CloudsService) {

  }

  public job: Job;
  public $company: Company[];
  public $location: Province[];
  public $job_type: TypeOfJob[];

  ngOnInit() {
    this.cls.selectedJob$.subscribe(res => {
      this.job = res;
    })

    this.getSelectInput();
  }

  getSelectInput() {
    this.js.getCompany().subscribe(res => {
      this.$company = res;
    });

    this.js.getLocation().subscribe(res => {
      this.$location = res;
    });

    this.js.getTypeofJob().subscribe(res => {
      this.$job_type = res;
    });
  }

  put( ): void {
    this.js.put (this.job).subscribe(
      (res: any) => {
        console.log(this.job);
        console.log(res); // Log the response for debugging
        alert('Put job successfully!');
      },
      (err: any) => {
        console.error('Đã xảy ra lỗi:', err); // Log any errors for debugging
        alert('Post job fail!');
        console.log(this.job);
      }
    );
  }
}
