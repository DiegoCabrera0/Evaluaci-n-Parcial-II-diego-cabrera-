import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
}

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.html',
  styleUrls: ['./estudiantes.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule
  ]
})
export class EstudiantesComponent {
  estudianteForm: FormGroup;
  estudiantes: Estudiante[] = [];
  editMode = false;
  editId: number | null = null;
  displayedColumns = ['id', 'nombre', 'apellido', 'acciones'];

  constructor(private fb: FormBuilder) {
    this.estudianteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required]
    });
  }

  addOrUpdateEstudiante() {
    if (this.editMode && this.editId !== null) {
      const index = this.estudiantes.findIndex(e => e.id === this.editId);
      if (index !== -1) {
        this.estudiantes[index] = { id: this.editId, ...this.estudianteForm.value };
      }
      this.cancelEdit();
    } else {
      const newEstudiante: Estudiante = {
        id: this.estudiantes.length + 1,
        ...this.estudianteForm.value
      };
      this.estudiantes.push(newEstudiante);
    }
    this.estudianteForm.reset();
  }

  editEstudiante(estudiante: Estudiante) {
    this.editMode = true;
    this.editId = estudiante.id;
    this.estudianteForm.setValue({
      nombre: estudiante.nombre,
      apellido: estudiante.apellido
    });
  }

  deleteEstudiante(id: number) {
    this.estudiantes = this.estudiantes.filter(e => e.id !== id);
    if (this.editMode && this.editId === id) {
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.editId = null;
    this.estudianteForm.reset();
  }
}