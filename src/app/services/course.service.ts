import { Observable } from 'rxjs';
import { Student } from './../models/student';
import { BASE_ENDPOINT } from './../config/app';
import { Course } from './../models/course';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends CommonService<Course> {

  protected baseEndpoint = BASE_ENDPOINT + '/courses';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public assignStudents(course: Course, students: Student[]): Observable<Course> {
    return this.httpClient.put<Course>(`${this.baseEndpoint}/${course.id}/assign-students`, students, { headers: this.headers });
  }

}
