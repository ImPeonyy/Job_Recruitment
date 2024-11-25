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
  public account : Account;

  constructor(private http: AccountService, private router: Router) {
    this.initializeLogin();
  }

  initializeLogin(){
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
  onSubmit() {
    if (this.account.username && this.account.password) {
      this.http.getAccByEmail(this.account.username).subscribe({
        next: (response) => {
          if (response.length > 0) {
            const user = response[0];
            if (user.password === this.account.password) {
              if (user.role === 'admin') {
                this.router.navigate(['/admin']);
              } else if (user.role === 'user') {
                this.router.navigate(['/index']);
              }
            } else {
              alert('Sai mật khẩu!');
            }
          } else {
            alert('Người dùng không tồn tại!');
          }
        },
        error: (err) => {
          console.error('Lỗi khi gọi API:', err);
          alert('Đăng nhập thất bại!');
        },
      });
    } else {
      alert('Vui lòng nhập đầy đủ thông tin!');
    }
  }
}
