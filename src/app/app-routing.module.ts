import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { PostJobComponent } from './pages/employer/post-job/post-job.component';
import { JobComponent } from './pages/admin/job/job.component';
import { ManagementComponent } from './pages/employer/management/management.component';
import { JobSearchComponent } from './pages/job-search/job-search.component';
import { TestComponent } from './test/test.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'job', component: JobComponent},
  {path: 'search', component: JobSearchComponent},
  {path: 'test', component: TestComponent},
  {path: 'sign-in', component: SignInComponent},

  //Admin

  //Employee


  // Employer
  {path: 'employer-management', component: ManagementComponent},
  {path: 'employer/post', component: PostJobComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
