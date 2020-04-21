import { StudentService } from './../../services/student.service';
import { Student } from './../../models/student';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFormsComponent } from '../common-forms.component';

@Component({
  selector: 'app-students-forms',
  templateUrl: './students-forms.component.html',
  styleUrls: ['./students-forms.component.css'],
})
export class StudentsFormsComponent extends CommonFormsComponent<Student, StudentService> implements OnInit {

  constructor(
    studentService: StudentService,
    router: Router,
    route: ActivatedRoute
  ) {
    super(studentService, router, route);
    this.title = 'Student form';
    this.model = new Student();
    this.modelName = Student.name;
    this.redirect = '/students';
  }

}
