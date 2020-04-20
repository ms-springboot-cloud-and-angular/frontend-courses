import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseEndpoint = 'http://localhost:8090/api/students';
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseEndpoint)
    .do( res => console.log('HTTP response:', res));
  }

  public listPageable(page: string, size: string): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<any>(`${this.baseEndpoint}/pageable`, { params: params });
  }

  public view(id: number): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseEndpoint}/${id}`);
  }

  public create(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.baseEndpoint, student, { headers: this.headers });
  }

  public edit(student: Student): Observable<Student> {
    return this.httpClient.put<Student>(`${this.baseEndpoint}/${student.id}`, student, { headers: this.headers });
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
