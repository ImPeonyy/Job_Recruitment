import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Job } from '../../models/job/job';
import { Account } from '../../models/account/account';

@Injectable({
  providedIn: 'root'
})
export class CloudsService {

  constructor() { }

  public selectedJob$ = new BehaviorSubject<Job>(null);
  public auth$ = new BehaviorSubject<number>(null);
  public authAccount$ = new BehaviorSubject<Account>(null);
}
