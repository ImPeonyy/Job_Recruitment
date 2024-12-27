import { Component, inject, OnInit } from '@angular/core';
import { JobService } from '../../../services/job/job.service';
import { Job } from '../../../models/job/job';
import { TypeOfJob } from '../../../models/type_of_job/type-of-job';
import { Company } from '../../../models/company/company';
import { Province } from '../../../models/province/province';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from '../../../models/account/account';
import { CloudsService } from '../../../services/clouds/clouds.service';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrl: './post-job.component.css'
})
export class PostJobComponent implements OnInit {

  constructor(private js: JobService, private cls: CloudsService) {

  }

  public job: Job;
  public company: Company;
  public $location: Province[];
  public $job_type: TypeOfJob[];
  private _snackBar = inject(MatSnackBar);
  account: Account;

  ngOnInit() {
    this.account = this.cls.get('account');
    this.initializeJob();
    this.getSelectInput();
  }

  initializeJob() {
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
      job_type: null,
      state: 0
    };
  }

  openSnackBar(message: string, duration) {
    const snackBarRef = this._snackBar.open(message, 'Đóng', {
      duration: duration * 1000,
    });

    snackBarRef.onAction().subscribe(() => {
      window.location.reload();
    });

    setTimeout(() => {
      snackBarRef.dismiss();
    }, duration * 1000);
  }

  getSelectInput() {
    this.js.getCompanyByID(this.account.ID).subscribe(res => {
      console.log(res);
      this.company = res;
    });

    this.js.getLocation().subscribe(res => {
      this.$location = res;
    });

    this.js.getTypeofJob().subscribe(res => {
      this.$job_type = res;
    });
  }

  post( ): void {
    this.job.company = this.company.ID
    this.js.post(this.job).subscribe(
      (res: any) => {
        this.initializeJob();
        this.openSnackBar('Đăng bài thành công !', 3);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      (err: any) => {
        this.openSnackBar('Đã xảy ra lỗi, vui lòng thử lại !', 3);
      }
    );
  }

}
