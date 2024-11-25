import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../models/account/account';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AccountService } from '../../services/account/account.service';
import { catchError, count, debounceTime, first, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{

  constructor(private router: Router, private fb: FormBuilder, private as: AccountService) {
    
  }

  ngOnInit() {
    this.initializeAccount();
    this.createForm();
  }

  isSignDivVisiable: boolean  = true;

  public account: Account
  public confirm_password;
  signUpForm: FormGroup;

  initializeAccount() {
    this.account = {
      ID : 0,
      name: null,
      email: null,
      password: null,
      phone_number: null,
      role: 1
    };
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  createForm() {
    this.signUpForm = this.fb.group({
      role: ['1', Validators.required],  // default to "Employee"
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
    }, { 
      validator: this.passwordMatchValidator
    });
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      this.as.post(this.account).subscribe(
        (res: any) => {
          this.initializeAccount();
          this.router.navigateByUrl('/index');
        },
        (err: any) => {
          alert('Post job fail!');
        }
      );
    } else {
      this.signUpForm.markAllAsTouched(); // to trigger validation
    }
  }

  onSignIn() {
    
    
  }
}
