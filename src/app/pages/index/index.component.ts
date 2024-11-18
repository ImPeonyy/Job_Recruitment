import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { Job } from '../../models/job/job';
import { Job_Index } from '../../models/job_index/job-index';
import { TypeOfJobService } from '../../services/type_of_job/type-of-job.service';
import { TypeOfJob } from '../../models/type_of_job/type-of-job';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  constructor(private js: JobService, private tobs: TypeOfJobService) {

  }

  public $job_index: Job_Index[];
  public $type_of_job: TypeOfJob[];

  ngOnInit() {
    this.js.getJobIndexDesc().subscribe(res => {
      this.$job_index = res;
      console.log(this.$job_index);
    });

    this.tobs.getJobTypeDesc().subscribe(res => {
      this.$type_of_job = res;
      console.log(this.$type_of_job);
    });
  }
}
