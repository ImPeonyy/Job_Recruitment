import { Component, OnInit } from '@angular/core';
import { Account } from '../../../models/account/account';
import { CloudsService } from '../../../services/clouds/clouds.service';
import { AccountService } from '../../../services/account/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  account: Account;
  constructor(private cls: CloudsService, private as: AccountService) {}
  ngOnInit(): void {
    this.account = this.cls.get('account');
  }

  update() {
    this.as.put(this.account).subscribe(
      res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    );
  }

}
