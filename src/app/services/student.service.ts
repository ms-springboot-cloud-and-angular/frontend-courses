import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { CommonService } from './common.service';
import { BASE_ENDPOINT } from '../config/app'

@Injectable({
  providedIn: 'root'
})
export class StudentService extends CommonService<Student> {

  protected baseEndpoint = BASE_ENDPOINT + '/students';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public createWithPhoto(student: Student, file: File): Observable<Student> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', student.name);
    formData.append('lastname', student.lastname);
    formData.append('email', student.email);
    return this.httpClient.post<Student>(this.baseEndpoint + '/create-with-photo', formData);
  }

  public editWithPhoto(student: Student, file: File): Observable<Student> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', student.name);
    formData.append('lastname', student.lastname);
    formData.append('email', student.email);
    return this.httpClient.put<Student>(`${this.baseEndpoint}/edit-with-photo/${student.id}`, formData);
  }
}
