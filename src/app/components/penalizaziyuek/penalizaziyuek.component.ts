import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { User } from 'src/clases/user';
import { PenalizationService } from 'src/servicios/penalization.service';
import { TareaService } from 'src/servicios/tarea.service';
import { UserService } from 'src/servicios/user.service';

@Component({
  selector: 'app-penalizaziyuek',
  templateUrl: './penalizaziyuek.component.html',
  styleUrls: ['./penalizaziyuek.component.scss'],
})
export class PenalizaziyuekComponent  implements OnInit {
  tareaForm: FormGroup;
  usuarios: User[] = []; 
  gordetzen = false;
  id: string | null= "";
  statusInicial: boolean = false;
  showCalendar = false;

  constructor(private fb: FormBuilder,private alertController: AlertController,private route: ActivatedRoute, private penalizationService: PenalizationService, private navCtrl: NavController , private userService: UserService) {

    this.tareaForm = this.fb.group({
      reason: ['', [Validators.required, Validators.minLength(5)]],
      userId: ['', Validators.required],
      points: [''],
    });
  }

  ngOnInit(){
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
      let points = this.getPoints();
      if(points)
        this.tareaForm.value.points = points*-1;
      this.penalizationService.addPenalization(this.tareaForm.value).subscribe(async c => {
        if (c) {
          let userUpdated = this.usuarios.find(u => u.id.toString() == this.tareaForm.value.userId.toString());
          if(userUpdated && !this.statusInicial){
            this.restarPuntos(userUpdated);
            this.userService.updateUser(userUpdated).subscribe();
          }
          await this.presentAlert('Penalizaziyue ondo gehitu da');
          this.navCtrl.navigateBack('/home');
        } else {
          await this.presentAlert('Ezin izenda gehitu penalizaziyue');
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

  getPoints(){
    const description = this.tareaForm.value.reason; // Guarda el valor de descripción en una variable para evitar llamadas repetidas

    if (description === "Zapatak sukaldin laga") {
        return 3;
    } else if (description === "Balletie ez sekau") {
        return 3;
    } else if (description === "Kafie ez kendu kafeteratik") {
        return 4;
    } else if (description === "Ontziyek garbitutakun fregaderi zikiñe") {
        return 5;
    } else if (description === "Dutxako toallie gaxki") {
        return 5;
    } else if (description === "Komedorien eon ta txukundu gabe") {
        return 3;
    }else{
      return 0;
    }
  }
  

  restarPuntos(user: User) {
    const description = this.tareaForm.value.reason; // Guarda el valor de descripción en una variable para evitar llamadas repetidas

    let p = this.getPoints();
    if(p)
      user.puntos -= p;
  }

}
