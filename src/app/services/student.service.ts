import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseEndpoint = 'http://localhost:8090/api/students';

  constructor(private httpClient: HttpClient) { }
}
