import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeOfJobService {

  readonly REST_API_SERVER = 'https://localhost:7275/api';
  private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
  };

  constructor(private http: HttpClient) {

  }

  // public selectedJob$ = new BehaviorSubject<Job>(null);

  public get(): Observable<any> {
    const url = `${this.REST_API_SERVER}/Type_of_Job`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public post(body): Observable<any> {
    const url = `${this.REST_API_SERVER}/Type_of_Job`;
    return this.http.post<any>(url, body, this.httpOptions);
  }

  public put(body): Observable<any> {
    const url = `${this.REST_API_SERVER}/Type_of_Job`;
    return this.http.put<any>(url, body, this.httpOptions);
  }

  public delete(id): Observable<any> {
    const url = `${this.REST_API_SERVER}/Type_of_Job/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }

  public getJobTypeDesc(): Observable<any> {
    const url = `${this.REST_API_SERVER}/Type_of_Job/GetJobTypeDesc`;
    return this.http.get<any>(url, this.httpOptions);
  }
}
