import { Component } from '@angular/core';

interface Job {
  title: string;
  company: string;
  location: string;
}

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css']
})
export class JobSearchComponent {
  keyword: string = '';
  location: string = '';
  jobs: Job[] = [];
  
  // Dữ liệu mẫu các công việc
  allJobs: Job[] = [
    { title: 'Frontend Developer', company: 'ABC Corp', location: 'Hà Nội' },
    { title: 'Backend Developer', company: 'XYZ Ltd', location: 'Hồ Chí Minh' },
    { title: 'Fullstack Developer', company: '123 Solutions', location: 'Đà Nẵng' },
  ];

  onSearch() {
    this.jobs = this.allJobs.filter(job =>
      job.title.toLowerCase().includes(this.keyword.toLowerCase()) &&
      job.location.toLowerCase().includes(this.location.toLowerCase())
    );
  }
}
