import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

// Tus componentes
import { EstudiantesComponent } from './components/estudiantes/estudiantes';
import { ProfesoresComponent } from './components/profesores/profesores';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    EstudiantesComponent,
    ProfesoresComponent
  ],
  template: `
    <h1>Escuela Frontend</h1>
    <app-estudiantes></app-estudiantes>
    <app-profesores></app-profesores>
  `
})
export class AppComponent {}