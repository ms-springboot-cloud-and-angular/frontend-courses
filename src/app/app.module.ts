import { LayoutModule } from './layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ExamsComponent } from './components/exams/exams.component';
import { StudentsFormsComponent } from './components/students/students-forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoursesFormsComponent } from './components/courses/courses-forms.component';
import { ExamFormsComponent } from './components/exams/exam-forms.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AssignStudentsComponent } from './components/courses/assign-students.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AssignExamsComponent } from './components/courses/assign-exams.component';
import { AnswerExamComponent } from './components/students/answer-exam.component';
import { AnswerExamDialogComponent } from './components/students/answer-exam-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent,
    ExamsComponent,
    StudentsFormsComponent,
    CoursesFormsComponent,
    ExamFormsComponent,
    AssignStudentsComponent,
    AssignExamsComponent,
    AnswerExamComponent,
    AnswerExamDialogComponent
  ],
  entryComponents: [
    AnswerExamDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
