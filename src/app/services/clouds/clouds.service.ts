import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../../models/job/job';
import { Account } from '../../models/account/account';
import { Job_Index } from '../../models/job_index/job-index';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CloudsService {

  constructor(private router: Router) { 
    const savedRole = sessionStorage.getItem('role');
    if (savedRole) {
      this.setRole(Number(savedRole)); // Cập nhật vai trò cho AuthService
    }
  }

  public selectedJob$ = new BehaviorSubject<Job>(null);
  public authAccount$ = new BehaviorSubject<Account>(null);
  public jobIndex$ = new BehaviorSubject<Job_Index>(null);
  private currentUserRole: number = 1; // Vai trò mặc định là Employee

  save(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  clear(): void {
    sessionStorage.clear();
  }

  setRole(role: number): void {
    this.currentUserRole = role;
  }

  getRole(): number {
    return this.currentUserRole;
  }

  hasRole(requiredRoles: number[]): boolean {
    console.log(this.currentUserRole);
    return requiredRoles.includes(this.currentUserRole);
  }
}
