import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account/account.service';
import { MatDialog } from '@angular/material/dialog';
import { Account } from '../../models/account/account';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public account : Account;
  public confirm_password;

  constructor(private http: AccountService,private dialogRef: MatDialog,){
    this.initializeRegister();
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
  }
  onRegister(){
    if(this.account.password == this.confirm_password){
      console.log(this.account);
      this.http.post(this.account).subscribe(
        (res: any) => {
          this.initializeRegister();
            location.reload();
            alert(res);
            console.log(this.account);
        },
        (err: any) => {
        }
      );
  } else{
    console.error('Confirm the wrong password');
  }
}
}
  


