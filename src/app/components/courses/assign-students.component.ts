import Swal from 'sweetalert2';
import { Student } from './../../models/student';
import { StudentService } from './../../services/student.service';
import { CourseService } from './../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from './../../models/course';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-assign-students',
  templateUrl: './assign-students.component.html',
  styleUrls: ['./assign-students.component.css']
})
export class AssignStudentsComponent implements OnInit {

  course: Course;
  studentsToAssign: Student[] = [];
  students: Student[] = [];

  displayedColumns: String[] = ['name', 'lastname', 'select'];
  displayedStudentsColumns: String[] = ['id', 'name', 'lastname', 'email'];

  selectionModel: SelectionModel<Student> = new SelectionModel<Student>(true, []);

  tabIndex: number = 0;

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private studentService: StudentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.courseService.view(id).subscribe(c => {
        this.course = c;
        this.students = this.course.students;
      });
    });
  }

  public filter(name: String): void {
    name = name !== undefined ? name.trim() : '';
    if (name !== '') {
      this.studentService.filterByName(name).subscribe(students => this.studentsToAssign = students.filter(s => {
        let isAssigned = true;
        this.course.students.forEach(sc => {
          if (s.id === sc.id) {
            isAssigned = false;
          }
        });
        return isAssigned;
      }));
    }
  }

  public isAllSelected(): boolean {
    return (this.selectionModel.selected.length === this.studentsToAssign.length);
  }

  public selectedOrUnSelectedAll(): void {
    if (this.isAllSelected()) {
      this.selectionModel.clear();
    }
    else {
      this.studentsToAssign.forEach(s => {
        this.selectionModel.select(s);
      });
    }
  }

  public assign(): void {
    console.log(this.selectionModel.selected);
    this.courseService.assignStudents(this.course, this.selectionModel.selected).subscribe(c => {
      this.tabIndex = 2;
      Swal.fire('Assign:', `Students assigns successfully in course ${this.course.name}`, 'success');
      this.students = this.students.concat(this.selectionModel.selected);
      this.studentsToAssign = [];
      this.selectionModel.clear();
    }, e => {
      if (e.status === 500) {
        const message = e.error.message as string;
        if (message.indexOf('ConstraintViolationException') > -1) {
          Swal.fire('Warnning!', `The student is already assigning to another course`, 'error');
        }
      }
    });
  }


}
