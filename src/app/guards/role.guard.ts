import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CloudsService } from '../services/clouds/clouds.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private cls: CloudsService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as number[]; // Nhận danh sách vai trò hợp lệ
    if (this.cls.hasRole(requiredRoles)) {
      return true; // Người dùng có quyền
    } else {
      this.router.navigate(['/unauthorized']); // Điều hướng nếu không có quyền
      return false;
    }
  }
}
