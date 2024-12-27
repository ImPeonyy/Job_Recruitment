import { Component, inject, OnInit } from '@angular/core';
import { JobService } from '../../../services/job/job.service';
import { Job } from '../../../models/job/job';
import { Company } from '../../../models/company/company';
import { Province } from '../../../models/province/province';
import { TypeOfJob } from '../../../models/type_of_job/type-of-job';
import { CloudsService } from '../../../services/clouds/clouds.service';
import { Account } from '../../../models/account/account';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-put-job',
  templateUrl: './put-job.component.html',
  styleUrl: './put-job.component.css'
})
export class PutJobComponent implements OnInit {
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
    this.cls.selectedJob$.subscribe(res => {
      this.job = res;
    })
    this.getSelectInput();
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

  put( ): void {
    this.js.put (this.job).subscribe(
      (res: any) => {
        this.openSnackBar('Sửa bài thành công !', 3);
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
