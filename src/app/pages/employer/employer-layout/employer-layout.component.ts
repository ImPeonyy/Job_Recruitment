import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostJobComponent } from '../post-job/post-job.component';

@Component({
  selector: 'app-employer-layout',
  templateUrl: './employer-layout.component.html',
  styleUrl: './employer-layout.component.css'
})
export class EmployerLayoutComponent {

  constructor(private dialogRef: MatDialog) {

  }

  openPostJobForm() {
    this.dialogRef.open(PostJobComponent, {
      height: '1000px',
      width: '640px'
    });
  }
}
