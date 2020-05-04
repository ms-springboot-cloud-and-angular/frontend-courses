import { Exam } from 'src/app/models/exam';
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

  public deleteStudent(course: Course, student: Student): Observable<Course> {
    return this.httpClient.put<Course>(`${this.baseEndpoint}/${course.id}/delete-student`, student, { headers: this.headers });
  }

  public assignExams(course: Course, exams: Exam[]): Observable<Course> {
    return this.httpClient.put<Course>(`${this.baseEndpoint}/${course.id}/assign-exams`, exams, { headers: this.headers });
  }

  public deleteExam(course: Course, exams: Exam): Observable<Course> {
    return this.httpClient.put<Course>(`${this.baseEndpoint}/${course.id}/delete-exam`, exams, { headers: this.headers });
  }

  public getCourseByStudentId(student: Student): Observable<Course> {
    return this.httpClient.get<Course>(`${this.baseEndpoint}/student/${student.id}`);
  }
}
