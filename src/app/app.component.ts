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
    
    this.cls.auth$.subscribe(res => {
      this.auth = res;
    })
    this.cls.auth$.subscribe(res => {
      console.log(res);
    })
    // this.auth = 1;
  }
  constructor(private cls: CloudsService) {
    
  }
}
