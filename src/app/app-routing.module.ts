import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { PostJobComponent } from './pages/employers/post-job/post-job.component';

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'employers/post', component: PostJobComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
