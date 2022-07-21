import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProfessorComponent } from './components/add-professor/add-professor.component';
import { EditProfessorComponent } from './components/edit-professor/edit-professor.component';
import { ViewProfessorComponent } from './components/view-professor/view-professor.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'addProfessor' },
  { path: 'addProfessor', component: AddProfessorComponent },
  { path: 'Professor/:id', component: EditProfessorComponent },
  { path: 'viewProfs', component: ViewProfessorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }