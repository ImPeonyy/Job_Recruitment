import { Component, OnInit } from '@angular/core';
import { CloudsService } from './services/clouds/clouds.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Job_Recruitment';

  public auth;

  ngOnInit() {
    this.auth = this.cls.auth;
    // this.auth = 1;
  }
  constructor(private cls: CloudsService) {
    console.log(this.cls.auth);
  }
}
