import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class StudentService extends CommonService<Student> {

  protected baseEndpoint = 'http://localhost:8090/api/students';

}
