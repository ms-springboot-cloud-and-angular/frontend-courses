import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from './../../services/course.service';
import { StudentService } from './../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/models/exam';
import { Course } from 'src/app/models/course';
import { Student } from './../../models/student';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-answer-exam',
  templateUrl: './answer-exam.component.html',
  styleUrls: ['./answer-exam.component.css']
})
export class AnswerExamComponent implements OnInit {

  student: Student;
  course: Course;
  exams: Exam[] = [];
  displayedExamsColumns: string[] = ['id', 'name', 'subject', 'questions', 'respond', 'view'];

  dataSource: MatTableDataSource<Exam>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(private route: ActivatedRoute,
    private studentService: StudentService,
    private courseService: CourseService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      this.studentService.view(id).subscribe(student => {
        this.student = student;
        this.courseService.getCourseByStudentId(this.student).subscribe(course => {
          this.course = course;
          this.exams = (this.course && this.course.exams) ? this.course.exams : [];
          this.dataSource = new MatTableDataSource<Exam>(this.exams);
          this.dataSource.paginator = this.paginator;
          this.paginator._intl.itemsPerPageLabel = 'Rows per page';
        });
      });
    });

  }

}
