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

}
