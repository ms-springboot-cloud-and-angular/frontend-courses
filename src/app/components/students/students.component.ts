import { Student } from './../../models/student';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  title: string = 'Students list';
  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.list().subscribe(students => this.students = students);
  }

  public delete(student: Student): void {
    if (confirm(`Are you sure you want to eliminate the student ${student.name} ?`)) {
      this.studentService.delete(student.id).subscribe(() => {
        this.students = this.students.filter( s => s !== student);
        alert(`Student ${student.name} successfully removed`);
      });
    }
  }

}
