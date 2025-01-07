import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/others/index/index.component';
import { JobSearchComponent } from './pages/others/job-search/job-search.component';
import { SignInComponent } from './pages/others/sign-in/sign-in.component';
import { PostCompanyComponent } from './pages/others/post-company/post-company.component';
import { EnrolmentComponent } from './pages/employer/enrolment/enrolment.component';
import { EmployerLayoutComponent } from './pages/employer/employer-layout/employer-layout.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { JobManagementComponent } from './pages/admin/job-management/job-management.component';
import { JobDetailComponent } from './pages/others/job-detail/job-detail.component';
import { RoleGuard } from './guards/role.guard';
import { UnauthorizedComponent } from './pages/others/unauthorized/unauthorized.component';
import { JobComponent } from './pages/employer/job/job.component';
import { AboutUsComponent } from './pages/others/about-us/about-us.component';

const routes: Routes = [
  {path: '', component: IndexComponent, canActivate: [RoleGuard], data: { roles: [-1, 0, 1] },},
  {path: 'search', component: JobSearchComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'post-company', component: PostCompanyComponent},
  {path: 'job-detail', component: JobDetailComponent},
  {path: 'about-us', component: AboutUsComponent},

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
    {path: 'job', component: JobComponent},
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
