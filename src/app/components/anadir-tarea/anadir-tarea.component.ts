import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
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
  gordetzen = false;
  showCalendar = false;
  constructor(private fb: FormBuilder, private alertController: AlertController, private tareaService: TareaService, private navCtrl: NavController , private userService: UserService) {

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

  toggleCalendar() {
    this.showCalendar = !this.showCalendar; // Alterna entre mostrar y ocultar el calendario
  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['ITXI']
    });
    await alert.present();
  }
  
  onSubmit() {
    if (this.tareaForm.valid) {
      if (this.tareaForm.value.userId === '') {
        this.tareaForm.value.userId = 0;
      }
      this.gordetzen = true;
      this.tareaService.addTarea(this.tareaForm.value).subscribe(async c => {
        if (c) {
          await this.presentAlert('Lana ondo gehitu da');
          this.navCtrl.navigateBack('/home');
        } else {
          await this.presentAlert('Ezin izenda gehitu lana');
          this.gordetzen = false;
        }
      });
    } else {
      console.log('Error');
    }
  }
  goBackHome() {
    this.navCtrl.navigateBack('/home'); // Cambiar '/home' a la ruta correcta si es necesario
  }
}
