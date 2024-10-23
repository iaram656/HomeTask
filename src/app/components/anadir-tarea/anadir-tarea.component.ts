import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaService } from 'src/servicios/tarea.service';

@Component({
  selector: 'app-anadir-tarea',
  templateUrl: './anadir-tarea.component.html',
  styleUrls: ['./anadir-tarea.component.scss']
})
export class AnadirTareaComponent {
  tareaForm: FormGroup;
  usuarios: string[] = ['Juan', 'María', 'Pedro', 'Ana']; 

  constructor(private fb: FormBuilder, private tareaService: TareaService) {

    this.tareaForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      limitDate: ['', Validators.required],
      userId: ['']
    });
  }

  onSubmit() {
    if (this.tareaForm.valid) {
      this.tareaService.addTarea(this.tareaForm.value).subscribe(c =>{
        if(c){
          alert('Tarea añadida correctamente');
        }else{
          alert('Error al añadir la tarea');
        }
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
