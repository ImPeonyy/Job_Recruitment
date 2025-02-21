import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  readonly REST_API_SERVER = 'https://localhost:7275/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {

  }

  public get(): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public post(body): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job`;
    return this.http.post<any>(url, body, this.httpOptions);
  }

  public put(body): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job`;
    return this.http.put<any>(url, body, this.httpOptions);
  }

  public delete(id): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }

  public getJobIndexDesc(): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job/GetJobIndexDesc`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public getJobIndex(): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job/GetJobIndex`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public getJobIndexByID(id): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job/GetJobIndex/${id}`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public getCompany(): Observable<any> {
    const url = `${this.REST_API_SERVER}/Company`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public getCompanyByID(id): Observable<any> {
    const url = `${this.REST_API_SERVER}/Company/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      map(response => response.length > 0 ? response[0] : null) // Return the first element or null if empty
    );
  }

  public getLocation(): Observable<any> {
    const url = `${this.REST_API_SERVER}/Province`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public getTypeofJob(): Observable<any> {
    const url = `${this.REST_API_SERVER}/Type_of_Job`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public getJobTypeDesc(): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job/GetJobTypeDesc`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public getLocationDesc(): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job/GetLocationDesc`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public updateJobState(job) : Observable<any[]> {
      const url = `${this.REST_API_SERVER}/Job/Putstate`;
      return this.http.put<any>(url, job, this.httpOptions);
    }
}
