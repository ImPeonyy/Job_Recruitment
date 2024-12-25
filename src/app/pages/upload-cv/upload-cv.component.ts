import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { EnrolmentService } from '../../services/enrolment/enrolment.service';
import { CloudsService } from '../../services/clouds/clouds.service';
import { Job_Index } from '../../models/job_index/job-index';
import { Account } from '../../models/account/account';
import { FormGroup } from '@angular/forms';
import { Enrolment } from '../../models/enrolment/enrolment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-cv',
  templateUrl: './upload-cv.component.html',
  styleUrl: './upload-cv.component.css'
})
export class UploadCvComponent implements OnInit{

  enrolment: Enrolment;
  jobIndex: Job_Index;
  user: Account;
  selectedFile: File | null = null;
  private _snackBar = inject(MatSnackBar);

  constructor(private http: HttpClient, private erms: EnrolmentService,
              private cls: CloudsService
   ) {}

  ngOnInit() {
    this.cls.jobIndex$.subscribe(res => {
      this.jobIndex = res;
    })
    this.user = this.cls.get('account');

    this.enrolment = {
      ID: 0,
      job: null,
      account: null,
      cv: 'default',
      file: null,
      state: 0
    }
  }

  openSnackBar(message: string, duration) {
    this._snackBar.open(message, duration);
  }

  // Khi người dùng chọn file
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  // Hàm để upload file lên server
  apply(): void {
    const formData = new FormData();

    // Thêm dữ liệu khác (account, job, state)
    formData.append('account', String(this.user.ID));
    formData.append('job', String(this.jobIndex.ID));
    formData.append('state', '0');
    formData.append('cv', 'default');

    // Thêm tệp
    formData.append('file', this.selectedFile);

    // Gửi FormData đến backend
    this.erms.post(formData).subscribe(
      response => {
        console.log(response);
      },
      error => {
        this.openSnackBar(error.error, 5);
      }
  );
}


}
