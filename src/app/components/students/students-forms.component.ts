import { StudentService } from './../../services/student.service';
import { Student } from './../../models/student';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students-forms',
  templateUrl: './students-forms.component.html',
  styleUrls: ['./students-forms.component.css'],
})
export class StudentsFormsComponent implements OnInit {
  title = 'Form Students';
  student: Student = new Student();
  error: any;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = +params.get('id');
      if (id) {
        this.studentService
          .view(id)
          .subscribe((student) => (this.student = student));
      }
    });
  }

  public create(): void {
    this.studentService.create(this.student).subscribe(
      (student) => {
        console.log(student);
        alert(`Student ${student.name} created successfully`);
        this.router.navigate(['/students']);
      },
      (err) => {
        console.log(err);
        if (err.status === 400) {
          this.error = err.error;
          console.log(this.error);
        }
      }
    );
  }

  public edit(): void {
    this.studentService.edit(this.student).subscribe(
      (student) => {
        console.log(student);
        alert(`Student ${student.name} updated successfully`);
        this.router.navigate(['/students']);
      },
      (err) => {
        console.log(err);
        if (err.status === 400) {
          this.error = err.error;
          console.log(this.error);
        }
      }
    );
  }
}
