import { StudentService } from './../../services/student.service';
import { Student } from './../../models/student';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-forms',
  templateUrl: './students-forms.component.html',
  styleUrls: ['./students-forms.component.css']
})
export class StudentsFormsComponent implements OnInit {

  title = "Form Students";
  student: Student = new Student();

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
  }

  public create():void {
    this.studentService.create(this.student).subscribe(student => {
      console.log(student);
      alert(`Student ${student.name} created successfully`);
      this.router.navigate(['students']);
    });
  }

}
