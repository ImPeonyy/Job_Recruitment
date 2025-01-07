import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../../../models/company/company';
import { CompanyService } from '../../../services/company/company.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from '../../../models/account/account';
import { CloudsService } from '../../../services/clouds/clouds.service';
import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'app-post-company',
  templateUrl: './post-company.component.html',
  styleUrl: './post-company.component.css'
})
export class PostCompanyComponent implements OnInit{

  constructor(private router: Router, private fb: FormBuilder,
              private cs: CompanyService, private cls: CloudsService,
              private as: AccountService) {

  }

  public company: Company;
  public isSignDivVisiable: boolean  = true;
  public selectedFile: File | null = null;
  public accRegis: Account;
  public account: Account;

  private _snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.initializeCompany();
    this.accRegis = this.cls.get('accRegis');
    this.as.getAccByEmail(this.accRegis.email).subscribe(res => {
      this.account = res;
    })
  }

  initializeCompany() {
    this.company = {
      ID : 0,
      accountID: 0,
      company_name: null,
      link: null,
      address: null,
      extent: 0,
      logo: null,
      file: null
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  post() {
    const formData = new FormData();

    formData.append('accountID', String(this.account.ID));
    formData.append('company_name', this.company.company_name);
    formData.append('link', this.company.link);
    formData.append('address', this.company.address);
    formData.append('extent', String(this.company.extent));
    formData.append('logo', '.\assets\img\company_logo\default-company-logo.png');

    // Thêm tệp
    formData.append('file', this.selectedFile);
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
      this.cs.post(formData).subscribe(
        (res: any) => {
          this.openSnackBar('Đã đăng ký công ty thành công !', 3);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        },
        (err: any) => {
          console.log(err);
          this.openSnackBar('Đã xảy ra lỗi, vui lòng thử lại !', 3);
        }
      );
    console.log(this.company);
  }
}
