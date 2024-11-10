import { Component } from '@angular/core';
import { JobService } from '../../../services/job/job.service';
import { Job } from '../../../models/job/job';
import { Company } from '../../../models/company/company';
import { Province } from '../../../models/province/province';
import { TypeOfJob } from '../../../models/type_of_job/type-of-job';

@Component({
  selector: 'app-put-job',
  templateUrl: './put-job.component.html',
  styleUrl: './put-job.component.css'
})
export class PutJobComponent {
  constructor(private http: JobService) {

  }

  public job: Job;
  public $company: Company[];
  public $location: Province[];
  public $job_type: TypeOfJob[];

  put( ): void {
    this.http.post(this.job).subscribe(
      (res: any) => {
        console.log(this.job);
        console.log(res); // Log the response for debugging
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
