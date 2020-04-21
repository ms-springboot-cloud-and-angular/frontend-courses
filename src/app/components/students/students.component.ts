import { Student } from './../../models/student';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { CommonListComponent } from '../common-list.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent extends CommonListComponent<Student, StudentService> implements OnInit {

  constructor(studentService: StudentService) {
    super(studentService);
    this.title = 'Students list';
    this.modelName = Student.name;
  }

}
