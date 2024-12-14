import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../models/account/account';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AccountService } from '../../services/account/account.service';
import { CloudsService } from '../../services/clouds/clouds.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{

  constructor(private router: Router, private fb: FormBuilder, 
              private as: AccountService, private cls: CloudsService) {
    
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

  authAccount() {
    var acc: Account;
    this.as.getAccByEmail(this.account.email).subscribe(res => {
      acc = res;
    })
    this.cls.auth$.subscribe(res => {
      console.log(res);
    })
    this.cls.auth$.next(1);
    this.cls.auth$.subscribe(res => {
      console.log(res);
    })
    this.cls.authAccount$.next(acc);
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      if(this.account.role == -1) {
        this.as.post(this.account).subscribe(
          (res: any) => {
            this.initializeAccount();
            this.router.navigate(['post-company']);
          },
          (err: any) => {
            alert('Post account fail');
          }
        );
      } else {
        this.as.post(this.account).subscribe(
          (res: any) => {
            this.initializeAccount();
            this.isSignDivVisiable  = false;          },
          (err: any) => {
            alert('Post account fail');
          }
        );
      }
    } else {
      this.signUpForm.markAllAsTouched(); // to trigger validation
    }
  }

  onSignIn() {
    if (!this.account.email || !this.account.password) {
      alert('Please enter both email and password!');
      return;
    }
    this.as.getAccByEmail(this.account.email).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          const user = response[0]; 
          if (user.password === this.account.password) {
            
            localStorage.setItem('user', JSON.stringify(user));
  
            if (user.role == 0) {
              this.authAccount();
              this.router.navigate(['/']);
            } else if (user.role == 1) {
              this.authAccount();
              this.router.navigate(['/']);
            } else {
              alert('Invalid role. Please contact support.');
            }
          } else {
            alert('Invalid password!');
          }
        } else {
        
          alert('Email does not exist!');
        }
      },
      (error) => {
        console.error(error);
        alert('Login failed. Please try again later.');
      }
    );
  }
}
