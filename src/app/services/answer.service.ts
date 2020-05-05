import { Exam } from 'src/app/models/exam';
import { Student } from './../models/student';
import { BASE_ENDPOINT } from './../config/app';
import { Observable } from 'rxjs';
import { Answer } from './../models/answer';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private baseEndpoint = BASE_ENDPOINT + '/answers';

  constructor(private HttpClient: HttpClient) { }

  public create(answers: Answer[]): Observable<Answer[]> {
    return this.HttpClient.post<Answer[]>(this.baseEndpoint, answers, { headers: this.headers });
  }

  public getAnswerByStudentAndExam(student: Student, exam: Exam): Observable<Answer[]> {
    return this.HttpClient.get<Answer[]>(`${this.baseEndpoint}/student/${student.id}/exam/${exam.id}`);
  }
}
