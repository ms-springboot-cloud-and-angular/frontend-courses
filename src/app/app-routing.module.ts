import { CoursesFormsComponent } from './components/courses/courses-forms.component';
import { StudentsFormsComponent } from './components/students/students-forms.component';
import { ExamsComponent } from './components/exams/exams.component';
import { CoursesComponent } from './components/courses/courses.component';
import { StudentsComponent } from './components/students/students.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo:'courses'},
  {path: 'students', component: StudentsComponent},
  {path: 'students/forms', component: StudentsFormsComponent},
  {path: 'students/forms/:id', component: StudentsFormsComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'courses/forms', component: CoursesFormsComponent},
  {path: 'courses/forms/:id', component: CoursesFormsComponent},
  {path: 'exams', component: ExamsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
