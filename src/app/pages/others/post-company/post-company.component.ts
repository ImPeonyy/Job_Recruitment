import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../../../models/company/company';
import { CompanyService } from '../../../services/company/company.service';

@Component({
  selector: 'app-post-company',
  templateUrl: './post-company.component.html',
  styleUrl: './post-company.component.css'
})
export class PostCompanyComponent implements OnInit{

  constructor(private router: Router, private fb: FormBuilder,
              private cs: CompanyService) {

  }

  public company: Company;
  postCompanyForm: FormGroup;
  isSignDivVisiable: boolean  = true;

  ngOnInit() {
    this.initializeCompany();
    this.createForm();
  }

  initializeCompany() {
    this.company = {
      ID : 0,
      accountID: 0,
      company_name: null,
      link: null,
      address: null,
      extent: 0,
      logo: null
    };
  }

  createForm() {
    this.postCompanyForm = this.fb.group({
      company_name: ['', Validators.required],
      link: ['', [Validators.required]],
      address: ['', [Validators.required]], 
      extent: ['', [Validators.required]]
    });
  }

  post() {
    // if (this.postCompanyForm.valid) {
    //   this.cs.post(this.company).subscribe(
    //     (res: any) => {
    //       this.initializeCompany();
    //     },
    //     (err: any) => {
    //       alert('Post company fail');
    //     }
    //   );
    // } else {
    //   this.postCompanyForm.markAllAsTouched();
    // }

    console.log(this.company);
  }
}
