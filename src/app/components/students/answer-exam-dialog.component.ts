import { Exam } from 'src/app/models/exam';
import { Student } from './../../models/student';
import { Course } from 'src/app/models/course';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-answer-exam-dialog',
  templateUrl: './answer-exam-dialog.component.html',
  styleUrls: ['./answer-exam-dialog.component.css']
})
export class AnswerExamDialogComponent implements OnInit {

  course: Course;
  student: Student;
  exam: Exam;
  answers = ['any answer'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AnswerExamDialogComponent>) {

  }

  ngOnInit(): void {
    this.course = this.data.course as Course;
    this.student = this.data.student as Student;
    this.exam = this.data.exam as Exam;
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
