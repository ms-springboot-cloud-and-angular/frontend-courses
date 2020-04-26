import { HttpClient } from '@angular/common/http';
import { BASE_ENDPOINT } from './../config/app';
import { Exam } from './../models/exam';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class ExamService extends CommonService<Exam> {

  protected baseEndpoint = BASE_ENDPOINT + '/exams';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

}
