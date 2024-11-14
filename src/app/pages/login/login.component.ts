import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account/account.service';
import { Account } from '../../models/account/account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public login: Account;
  public $logins: Account[];

  constructor(private http: AccountService, private router: Router) {
    this.getAccount();
  }

  onSubmit() {
    
  }
  getAccount(): any{
    this.http.get().subscribe(res => {
      this.$logins = res;
    })
  }
}
