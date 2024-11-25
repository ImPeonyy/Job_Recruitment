import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../../models/job/job';

@Injectable({
  providedIn: 'root'
})
export class CloudsService {

  constructor() { }

  public selectedJob$ = new BehaviorSubject<Job>(null);
  public auth = 0;
}
