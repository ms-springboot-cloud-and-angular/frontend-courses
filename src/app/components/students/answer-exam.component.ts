import { ViewExameDialogComponent } from './view-exame-dialog.component';
import Swal from 'sweetalert2';
import { Answer } from './../../models/answer';
import { AnswerService } from './../../services/answer.service';
import { AnswerExamDialogComponent } from './answer-exam-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CourseService } from './../../services/course.service';
import { StudentService } from './../../services/student.service';
import { ActivatedRoute } from '@angular/router';
import { Exam } from 'src/app/models/exam';
import { Course } from 'src/app/models/course';
import { Student } from './../../models/student';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
    private courseService: CourseService,
    private answerService: AnswerService,
    public dialog: MatDialog) { }

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

  public respondExam(exam: Exam): void {
    const dialogRef = this.dialog.open(AnswerExamDialogComponent, {
      width: '750px',
      data: { course: this.course, student: this.student, exam: exam }
    });

    dialogRef.afterClosed().subscribe((answersMap: Map<number, Answer>) => {
      console.log('after closed', answersMap);
      if (answersMap) {
        const answers: Answer[] = Array.from(answersMap.values());
        this.answerService.create(answers).subscribe(as => {
          exam.answered = true;
          Swal.fire('Sent', `Answers sent successfully`, 'success');
          console.log(as);
        });
      }
    });
  }

  public viewExam(exam: Exam): void {
    this.answerService.getAnswerByStudentAndExam(this.student, exam).subscribe(answers => {
      const dialogRef = this.dialog.open(ViewExameDialogComponent, {
        width: '750px',
        data: { course: this.course, exam: exam, answers: answers }
      });
      dialogRef.afterClosed().subscribe(() => {
        console.log('after closed vie exam');
      });
    });
  }

}
