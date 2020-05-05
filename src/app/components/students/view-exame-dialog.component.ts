import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from './../../models/student';
import { Answer } from './../../models/answer';
import { Exam } from 'src/app/models/exam';
import { Course } from 'src/app/models/course';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-view-exame-dialog',
  templateUrl: './view-exame-dialog.component.html',
  styleUrls: ['./view-exame-dialog.component.css']
})
export class ViewExameDialogComponent implements OnInit {


  course: Course;
  exam: Exam;
  answers: Answer[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewExameDialogComponent>) {

  }

  ngOnInit(): void {
    this.course = this.data.course as Course;
    this.exam = this.data.exam as Exam;
    this.answers = this.data.answers as Answer[];
  }

  public close(): void {
    this.dialogRef.close();
  }

}
