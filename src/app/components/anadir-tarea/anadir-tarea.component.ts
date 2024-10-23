import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { User } from 'src/clases/user';
import { TareaService } from 'src/servicios/tarea.service';
import { UserService } from 'src/servicios/user.service';

@Component({
  selector: 'app-anadir-tarea',
  templateUrl: './anadir-tarea.component.html',
  styleUrls: ['./anadir-tarea.component.scss']
})
export class AnadirTareaComponent {
  tareaForm: FormGroup;
  usuarios: User[] = []; 

  constructor(private fb: FormBuilder, private tareaService: TareaService, private navCtrl: NavController , private userService: UserService) {

    this.tareaForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      limitDate: ['', Validators.required],
      userId: ['']
    });
  }

  ngOnInit(){
    console.log("aa")
    this.userService.getUsers().subscribe(c => {
      this.usuarios = c;
    })
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

  goBackHome() {
    this.navCtrl.navigateBack('/home'); // Cambiar '/home' a la ruta correcta si es necesario
  }
}
