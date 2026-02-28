import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Profesor {
  id: number;
  nombre: string;
  apellido: string;
  materia: string;
}

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.html',
  styleUrls: ['./profesores.css'],
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
export class ProfesoresComponent {
  profesorForm: FormGroup;
  profesores: Profesor[] = [];
  editMode = false;
  editId: number | null = null;
  displayedColumns = ['id', 'nombre', 'apellido', 'materia', 'acciones'];

  constructor(private fb: FormBuilder) {
    this.profesorForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      materia: ['', Validators.required]
    });
  }

  addOrUpdateProfesor() {
    if (this.editMode && this.editId !== null) {
      const index = this.profesores.findIndex(p => p.id === this.editId);
      if (index !== -1) {
        this.profesores[index] = { id: this.editId, ...this.profesorForm.value };
      }
      this.cancelEdit();
    } else {
      const newProfesor: Profesor = {
        id: this.profesores.length + 1,
        ...this.profesorForm.value
      };
      this.profesores.push(newProfesor);
    }
    this.profesorForm.reset();
  }

  editProfesor(profesor: Profesor) {
    this.editMode = true;
    this.editId = profesor.id;
    this.profesorForm.setValue({
      nombre: profesor.nombre,
      apellido: profesor.apellido,
      materia: profesor.materia
    });
  }

  deleteProfesor(id: number) {
    this.profesores = this.profesores.filter(p => p.id !== id);
    if (this.editMode && this.editId === id) {
      this.cancelEdit();
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.editId = null;
    this.profesorForm.reset();
  }
}