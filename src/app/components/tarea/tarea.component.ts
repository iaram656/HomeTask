import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { User } from 'src/clases/user';
import { TareaService } from 'src/servicios/tarea.service';
import { UserService } from 'src/servicios/user.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss'],
})
export class TareaComponent  implements OnInit {
  tareaForm: FormGroup;
  usuarios: User[] = []; 
  gordetzen = false;
  id: string | null= "";
  statusInicial: boolean = false;
  showCalendar = false;

  constructor(private fb: FormBuilder,private alertController: AlertController,private route: ActivatedRoute, private tareaService: TareaService, private navCtrl: NavController , private userService: UserService) {

    this.tareaForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      limitDate: ['', Validators.required],
      userId: [''], 
      status: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.tareaService.getTarea(this.id).subscribe(c => {
        this.tareaForm.setValue({description: c.description, limitDate: c.limitDate, userId: c.userId, status: c.status});
        this.statusInicial = c.status;
      });
    }
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
      if(this.id){
        console.log(this.tareaForm.value);
        this.tareaService.updateTarea(this.id, this.tareaForm.value).subscribe(async c => {
          if (c) {
            await this.presentAlert('Lana ondo gehitu da');
            console.log(this.tareaForm.value.userId);
            let userUpdated = this.usuarios.find(u => u.id.toString() == this.tareaForm.value.userId.toString());
            console.log(userUpdated);
            if(userUpdated && !this.statusInicial){
              this.añadirPuntos(userUpdated);
              this.userService.updateUser(userUpdated).subscribe();
            }else if(userUpdated && this.statusInicial && this.tareaForm.value.status == false){
              this.restarPuntos(userUpdated);
              this.userService.updateUser(userUpdated).subscribe();
            } 
            this.navCtrl.navigateBack('/tareas');            
          } else {
            await this.presentAlert('Ezin izenda gehitu lana');
            this.gordetzen = false;
          }
        });
      }
    } else {
      console.log('Error');
    }
  }

  goBackHome() {
    this.navCtrl.navigateBack('/home'); // Cambiar '/home' a la ruta correcta si es necesario
  }

  añadirPuntos(user: User) {
    const description = this.tareaForm.value.description; // Guarda el valor de descripción en una variable para evitar llamadas repetidas

    if (description === "Ontziyek garbitu") {
      user.puntos += 20;
  } else if (description === "Ontziyek jaso") {
      user.puntos += 10;
  } else if (description === "Erropak ixigi") {
      user.puntos += 20;
  } else if (description === "Erropa txikiyek ixigi") {
    user.puntos += 20;
} else if (description === "Erropa haundiyek ixigi") {
  user.puntos += 20;
} else if (description === "Erropak jaso") {
      user.puntos += 20;
  } else if (description === "Bitrue garbitu") {
      user.puntos += 10;
  }else if (description === "Kumunzulue garbitu") {
      user.puntos += 20;
  } else if (description === "Kumuneko ispilue garbiu") {
      user.puntos += 10;
  } else if (description === "Erretza etxe osun") {
      user.puntos += 20;
  } else if (description === "Erretza kumun + sukalde") {
      user.puntos += 10;
  }else if (description === "Txabolan lanak") {
    user.puntos += 30;
}else if (description === "Txakurrei jana eman") {
  user.puntos += 10;
} else if (description === "Lorak ureztau") {
  user.puntos += 10;
}else if (description === "Lorak garbiu") {
      user.puntos += 10;
  } else if (description === "Kafie iñ") {
    user.puntos += 10;
}else if (description === "Bazkaye/afaye iñ") {
      user.puntos += 20;
  } else if (description === "5ok gaudenin mahai osue jaso") {
      user.puntos += 10;
  }else if (description === "Konprak iñ") {
    user.puntos += 20;
}else if (description === "Ogiye erosi") {
  user.puntos += 10;
}else if (description === "Basurie jeitsi") {
  user.puntos += 10;
}
  

    
  }

  restarPuntos(user: User) {
    const description = this.tareaForm.value.description; // Guarda el valor de descripción en una variable para evitar llamadas repetidas

    if (description === "Ontziyek garbitu") {
      user.puntos -= 20;
  } else if (description === "Ontziyek jaso") {
      user.puntos -= 10;
  } else if (description === "Erropak ixigi") {
      user.puntos -= 20;
  } else if (description === "Erropa txikiyek ixigi") {
    user.puntos -= 20;
} else if (description === "Erropa haundiyek ixigi") {
  user.puntos -= 20;
} else if (description === "Erropak jaso") {
      user.puntos -= 20;
  } else if (description === "Bitrue garbitu") {
      user.puntos -= 10;
  }else if (description === "Kumunzulue garbitu") {
      user.puntos -= 20;
  } else if (description === "Kumuneko ispilue garbiu") {
      user.puntos -= 10;
  } else if (description === "Erretza etxe osun") {
      user.puntos -= 20;
  } else if (description === "Erretza kumun + sukalde") {
      user.puntos -= 10;
  }else if (description === "Txabolan lanak") {
    user.puntos -= 30;
}else if (description === "Txakurrei jana eman") {
  user.puntos -= 10;
} else if (description === "Lorak ureztau") {
  user.puntos -= 10;
}else if (description === "Lorak garbiu") {
      user.puntos -= 10;
  } else if (description === "Kafie iñ") {
    user.puntos -= 10;
}else if (description === "Bazkaye/afaye iñ") {
      user.puntos -= 20;
  } else if (description === "5ok gaudenin mahai osue jaso") {
      user.puntos -= 10;
  }else if (description === "Konprak iñ") {
    user.puntos -= 20;
}else if (description === "Ogiye erosi") {
  user.puntos -= 10;
}else if (description === "Basurie jeitsi") {
  user.puntos -= 10;
}
  }

}
