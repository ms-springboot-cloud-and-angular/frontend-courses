import { AnswerExamComponent } from './components/students/answer-exam.component';
import { AssignExamsComponent } from './components/courses/assign-exams.component';
import { AssignStudentsComponent } from './components/courses/assign-students.component';
import { CoursesFormsComponent } from './components/courses/courses-forms.component';
import { StudentsFormsComponent } from './components/students/students-forms.component';
import { ExamsComponent } from './components/exams/exams.component';
import { CoursesComponent } from './components/courses/courses.component';
import { StudentsComponent } from './components/students/students.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamFormsComponent } from './components/exams/exam-forms.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'students', component: StudentsComponent },
  { path: 'students/forms', component: StudentsFormsComponent },
  { path: 'students/forms/:id', component: StudentsFormsComponent },
  { path: 'students/answer-exam/:id', component: AnswerExamComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'courses/forms', component: CoursesFormsComponent },
  { path: 'courses/forms/:id', component: CoursesFormsComponent },
  { path: 'courses/assign-students/:id', component: AssignStudentsComponent },
  { path: 'courses/assign-exams/:id', component: AssignExamsComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'exams/forms', component: ExamFormsComponent },
  { path: 'exams/forms/:id', component: ExamFormsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
