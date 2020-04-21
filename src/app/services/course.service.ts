import { Course } from './../models/course';
import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends CommonService<Course> {

  protected baseEndpoint = 'http://localhost:8090/api/courses';

}
