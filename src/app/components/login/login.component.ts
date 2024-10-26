import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { catchError, retry } from 'rxjs';
import { AuthService } from 'src/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  iniciando: boolean= false;
  users: String[] = ["Aita", "Ama", "Eneritz", "Oihan", "Ioritz"]
  constructor(private formBuilder: FormBuilder,private alertController: AlertController, private authService: AuthService, private http: HttpClient, private navCtrl: NavController) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
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
    if (this.loginForm.valid) {
      this.iniciando = true;
      const { username, password } = this.loginForm.value;
      this.http.post('https://hometaskapi-1.onrender.com/login', { username, password }).pipe(
        retry(3),  // Reintentar hasta 5 veces en caso de error
        catchError((error) => {
          console.error('Error al obtener las tareas:', error);
          throw error;  // Lanza el error para manejarlo fuera si es necesario
        })
      ).subscribe(
        async response => {
          if(response){
            this.authService.login();
            this.navCtrl.navigateForward('/home'); 
          }else{
            await this.presentAlert('Kontraseñie gaxki dao');          
          }
          this.iniciando=false;
        }
      )
    }
  }
}
