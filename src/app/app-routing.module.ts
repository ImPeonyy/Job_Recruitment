import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { PostJobComponent } from './pages/employer/post-job/post-job.component';
import { JobComponent } from './pages/admin/job/job.component';
import { ManagementComponent } from './pages/employer/management/management.component';
import { JobSearchComponent } from './pages/job-search/job-search.component';
import { TestComponent } from './test/test.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { PostCompanyComponent } from './pages/post-company/post-company.component';
import { EnrolmentComponent } from './pages/employer/enrolment/enrolment.component';
import { EmployerLayoutComponent } from './pages/employer/employer-layout/employer-layout.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { JobManagementComponent } from './pages/admin/job-management/job-management.component';
import { JobDetailComponent } from './pages/job-detail/job-detail.component';
import { RoleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  {path: '', component: IndexComponent, canActivate: [RoleGuard], data: { roles: [-1, 0, 1] },},
  {path: 'job', component: JobComponent},
  {path: 'search', component: JobSearchComponent},
  {path: 'test', component: TestComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'post-company', component: PostCompanyComponent},
  {path: 'job-detail', component: JobDetailComponent},

  //Admin
  {path: 'admin', component: AdminLayoutComponent, canActivate: [RoleGuard], data: { roles: [0] }, 
  children: [
    {path: 'user-management', component: UserManagementComponent},
    {path: 'job-management', component: JobManagementComponent},
  ]},

  //Employee

  // Employer
  {path: 'employer', component: EmployerLayoutComponent, canActivate: [RoleGuard], data: { roles: [-1] },
    children: [
    {path: 'management', component: ManagementComponent},
    {path: 'enrolment', component: EnrolmentComponent},
  ]},

  {path: 'unauthorized',component: UnauthorizedComponent,}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
     onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
