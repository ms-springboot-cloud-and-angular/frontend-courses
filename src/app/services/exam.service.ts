import { Exam } from './../models/exam';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends CommonService<Exam> {

  protected baseEndpoint = 'http://localhost:8090/api/exams';

}
