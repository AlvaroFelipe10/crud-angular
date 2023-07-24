import { FormGroup, UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  ValidateAllFormFields(FormGroup: UntypedFormGroup | UntypedFormArray){
    Object.keys(FormGroup.controls).forEach(field => {
      const control = FormGroup.get(field);
      if(control instanceof UntypedFormControl){
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray){
        control.markAsTouched({onlySelf: true});
        this.ValidateAllFormFields(control);
      }
    });
  }


  getErrorMessage(FormGroup: UntypedFormGroup,  fieldName: string) {
    const field = FormGroup.get(fieldName) as UntypedFormControl ;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('minLength')) {
      const requiredLength = field.errors
        ? field.errors['minLength']['requiredLength']
        : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }
    if (field?.hasError('maxLength')) {
      const requiredLength = field.errors
        ? field.errors['maxLength']['requiredLength']
        : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }
    return 'Campo inválido';
  }

  getFormArrayFieldErrorMessage(FormGroup: UntypedFormGroup, formArrayName: string ,
     fieldName: string, index: number){
    const formArray = FormGroup.get('formArrayName') as UntypedFormArray;
    const field = formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  isFormArrayRequired(FormGroup: UntypedFormGroup, formArrayName: string){
    const lessons = FormGroup.get(formArrayName) as UntypedFormArray;
    return !lessons.valid && lessons.hasError('required') && lessons.touched;
  }
}
