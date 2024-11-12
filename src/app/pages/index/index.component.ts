import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job/job.service';
import { Job } from '../../models/job/job';
import { Job_Index } from '../../models/job_index/job-index';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  constructor(private http: JobService) {

  }

  public $job_index: Job_Index[];

  ngOnInit() {
    this.http.getJobIndexDesc().subscribe(res => {
      this.$job_index = res;
      console.log(this.$job_index);
    });
  }
}
