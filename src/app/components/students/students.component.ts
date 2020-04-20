import { Student } from './../../models/student';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  title: string = 'Students list';
  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService
      .list()
      .subscribe((students) => (this.students = students));
  }

  public delete(student: Student): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Are you sure you want to eliminate the student ${student.name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.studentService.delete(student.id).subscribe(() => {
          this.students = this.students.filter((s) => s !== student);
          Swal.fire(
            'Deleted',
            `Student ${student.name} successfully removed`,
            'success'
          );
        });
      }
    });
  }
}
