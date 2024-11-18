import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { PostJobComponent } from './pages/employer/post-job/post-job.component';
import { JobComponent } from './pages/admin/job/job.component';

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'employer/post', component: PostJobComponent},
  {path: 'job', component: JobComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
