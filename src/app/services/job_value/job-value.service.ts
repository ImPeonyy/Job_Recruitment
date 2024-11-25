import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobValueService {

  readonly REST_API_SERVER = 'https://localhost:7275/api';
  private httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
  };

  constructor(private http: HttpClient) {

  }

  public get(): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job_Value`;
    return this.http.get<any>(url, this.httpOptions);
  }

  public post(body): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job_Value`;
    return this.http.post<any>(url, body, this.httpOptions);
  }

  public put(body): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job_Value`;
    return this.http.put<any>(url, body, this.httpOptions);
  }

  public delete(id): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job_Value/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }

  public getByID(id): Observable<any> {
    const url = `${this.REST_API_SERVER}/Job_Value/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      map(response => response.length > 0 ? response[0] : null) // Return the first element or null if empty
  );
  }
}
