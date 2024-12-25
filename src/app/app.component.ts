import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CloudsService } from './services/clouds/clouds.service';
import { Account } from './models/account/account';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Job_Recruitment';

  constructor(private cls: CloudsService, private router: Router) {
    
  }

  account: Account;
  auth: string;

  ngOnInit() {
    this.auth = sessionStorage.getItem('auth');
    this.account = this.cls.get('account');
  }

  getRouterLink() {
    if (this.account.role === 0) {
      return ['admin'];  // RouterLink cho admin
    } else if (this.account.role === 1) {
      return ['employee'];  // RouterLink cho manager
    } else if (this.account.role === -1) {
      return ['employer'];  // RouterLink cho user
    } else {
      return ['default'];  // RouterLink mặc định nếu không có role
    }
  }

  signOut() {
    this.cls.remove('auth');
    this.cls.remove('account');
    window.location.reload();
  }
}
