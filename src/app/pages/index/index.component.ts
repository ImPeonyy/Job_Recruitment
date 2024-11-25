import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { Job } from '../../models/job/job';
import { Job_Index } from '../../models/job_index/job-index';
import { TypeOfJobService } from '../../services/type_of_job/type-of-job.service';
import { TypeOfJob } from '../../models/type_of_job/type-of-job';
import { Province } from '../../models/province/province';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  constructor(private js: JobService) {

  }

  public $job_index: Job_Index[];
  public $count_job_type: CountJobType[];
  public $count_location: CountLocation[];

  ngOnInit() {
    this.js.getJobIndexDesc().subscribe(res => {
      this.$job_index = res;
      console.log(this.$job_index);
    });

    this.js.getJobTypeDesc().subscribe(res => {
      this.$count_job_type = res;
      console.log(this.$count_job_type);
    });

    this.js.getLocationDesc().subscribe(res => {
      this.$count_location = res;
      console.log(this.$count_location);
    });
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
