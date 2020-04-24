import { LayoutModule } from './layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ExamsComponent } from './components/exams/exams.component';
import { StudentsFormsComponent } from './components/students/students-forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoursesFormsComponent } from './components/courses/courses-forms.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    CoursesComponent,
    ExamsComponent,
    StudentsFormsComponent,
    CoursesFormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
