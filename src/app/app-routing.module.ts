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

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'job', component: JobComponent},
  {path: 'search', component: JobSearchComponent},
  {path: 'test', component: TestComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'post-company', component: PostCompanyComponent},

  //Admin

  //Employee

  // Employer
  {path: 'employer', component: EmployerLayoutComponent, children: [
    {path: 'management', component: ManagementComponent},
    {path: 'enrolment', component: EnrolmentComponent},
  ]},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
