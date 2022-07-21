import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProfessorComponent } from './components/add-professor/add-professor.component';
import { EditProfessorComponent } from './components/edit-professor/edit-professor.component';
import { ViewProfessorComponent } from './components/view-professor/view-professor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    AddProfessorComponent,
    EditProfessorComponent,
    ViewProfessorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
