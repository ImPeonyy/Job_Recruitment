import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  remember: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('YOUR_API_URL_HERE', loginData).subscribe(
      (response: any) => {
        // Xử lý phản hồi từ API
        console.log('Login successful', response);
        // Lưu thông tin người dùng vào local storage hoặc xử lý điều hướng
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/home']); // Điều hướng đến trang chính sau khi đăng nhập
      },
      (error) => {
        // Xử lý lỗi
        console.error('Login failed', error);
        alert('Login failed. Please check your email and password.');
      }
    );
  }
}
