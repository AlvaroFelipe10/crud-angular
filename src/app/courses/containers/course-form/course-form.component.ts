import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from './../../models/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id:[''],
    name: ['', [Validators.required,
    Validators.minLength(5),
    Validators.maxLength(100)]],
    category:['', [Validators.required]]
  });

  constructor (private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
    }


  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onCancel(){
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', {duration:5000})
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso.', '', {duration:5000})
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if (field?.hasError('required')){
      return 'Campo obrigatório';
    }
    if (field?.hasError('minLength')){
      const requiredLength = field.errors ? field.errors['minLength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }
    if (field?.hasError('maxLength')){
      const requiredLength = field.errors ? field.errors['maxLength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }
    return 'Campo inválido';
  }
}
