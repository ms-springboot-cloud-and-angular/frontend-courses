import { Student } from './../../models/student';
import { StudentService } from './../../services/student.service';
import { CourseService } from './../../services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from './../../models/course';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-students',
  templateUrl: './assign-students.component.html',
  styleUrls: ['./assign-students.component.css']
})
export class AssignStudentsComponent implements OnInit {

  course: Course;
  studentsToAssign: Student[];
  displayedColumns: String[] = ['name', 'lastname'];

  constructor(private route: ActivatedRoute, private courseService: CourseService,
    private studentService: StudentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id: number = +params.get('id');
      this.courseService.view(id).subscribe(c => this.course = c);
    });
  }

  public filter(name: String): void {
    name = name !== undefined ? name.trim() : '';
    if (name !== '') {
      this.studentService.filterByName(name).subscribe(students => this.studentsToAssign = students);
    }
  }

}
