import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account/account.service';
import { MatDialog } from '@angular/material/dialog';
import { Account } from '../../models/account/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isSignDivVisiable: boolean  = true;
  public account : Account;
  public confirm_password;
  public company: string = '';
  public selectedRole: string = ''; 
  public registerForm: FormGroup; 
  public loginForm: FormGroup;

  constructor(private http: AccountService,private dialogRef: MatDialog,private router: Router,private fb: FormBuilder){
    this.initializeRegister();
    this.initializeForms();
    
  }
  initializeForms() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]], 
      company: ['']
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]] 
    });
  }

  initializeRegister(){
    this.account = {
    ID : 0,
    username: '',
    password: '',
    name: '',
    email: '',
    phone_number: '',
    role: '',
    };
    this.company = '';
    this.selectedRole = '';
  }

  onSelectRole(role: string) {
    this.selectedRole = role;
  }


  onRegister() {
    if (this.selectedRole === 'employer' && !this.company) {
      alert('Company name is required for employers!');
      return;
    }

    if (this.account.password !== this.confirm_password) {
      alert('Passwords do not match!');
      return;
    }

   
    this.account.role = this.selectedRole;
    if (this.selectedRole === 'employer') {
      this.account['company'] = this.company; 
    }

    this.http.post(this.account).subscribe(
      (res: any) => {
        alert('Registration successful!');
        this.initializeRegister();
        if (this.selectedRole === 'employer') {
          this.router.navigate(['/company-details']);
        }
      },
      (err: any) => {
        console.error(err);
        alert('Registration failed. Please try again.');
      }
    );
  }


  onLogin() {
    if (!this.account.email || !this.account.password) {
      alert('Please enter both email and password!');
      return;
    }
    this.http.getAccByEmail(this.account.email).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          const user = response[0]; 
          if (user.password === this.account.password) {
            
            localStorage.setItem('user', JSON.stringify(user));
  
            if (user.role === 'admin') {
              alert('Welcome Admin!');
              this.router.navigate(['/admin-dashboard']);
            } else if (user.role === 'user') {
              alert('Welcome User!');
              this.router.navigate(['/user-dashboard']);
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



