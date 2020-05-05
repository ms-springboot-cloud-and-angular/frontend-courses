import { Answer } from './../../models/answer';
import { Question } from 'src/app/models/question';
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
  answers: Map<number, Answer> = new Map<number, Answer>();

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

  public processAnswer(question: Question, event: any): void {
    const text = event.target.value as string;
    const answer = new Answer();
    answer.student = this.student;
    answer.question = question;

    const exam: Exam = new Exam();
    exam.id = this.exam.id;
    exam.name = this.exam.name;

    answer.question.exam = exam;
    answer.text = text;

    this.answers.set(question.id, answer);
    console.log(this.answers);
  }
}
