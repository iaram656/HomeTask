import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Penalization } from 'src/clases/penalization';
import { User } from 'src/clases/user';
import { PenalizationService } from 'src/servicios/penalization.service';
import { TareaService } from 'src/servicios/tarea.service';
import { UserService } from 'src/servicios/user.service';

@Component({
  selector: 'app-penalizaziyo-danak',
  templateUrl: './penalizaziyo-danak.component.html',
  styleUrls: ['./penalizaziyo-danak.component.scss'],
})
export class PenalizaziyoDanakComponent  implements OnInit {
  penalizaziyuek: Penalization[] = [];
  cargando: boolean = true;
  usuarios: User[] = [];
  tareaForm: FormGroup;
  userColors: { [key: string]: string } = {
    '0': '#ccc',
    '1': '#FFB3BA', // Pastel rojo
    '2': '#FFDFBA', // Pastel naranja
    '3': '#FFFFBA', // Pastel amarillo
    '4': '#BAFFC9', // Pastel verde
    '5': '#BAE1FF', // Pastel azul
  };

  selectedDate: Date = new Date(); // Fecha seleccionada

  constructor(
    private fb: FormBuilder,
    private penalizationService: PenalizationService,
    private router: Router,
    private userService: UserService,
    private navCtrl: NavController
  ) {
    this.tareaForm = this.fb.group({
      users: [''],
    });
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.obtenerPenalizations();
    this.userService.getUsers().subscribe((c) => {
      this.usuarios = c;
    });
  }

  obtenerPenalizations() {
    this.penalizationService.getPenalizations().subscribe(
      (data: Penalization[]) => {
        this.penalizaziyuek = data.sort((a, b) => {
          const fechaA = new Date(a.date).getTime();
          const fechaB = new Date(b.date).getTime();
          return fechaB - fechaA;
        });

        this.cargando = false;
      }
    );
  }

  getUserColorById(userId: string): string {
    return this.userColors[userId] || '#888'; // Gris por defecto
  }

  getUserNameById(userId: number): string {
    const user = this.usuarios.find((u) => u.id === userId);
    return user ? user.name : 'Iño ez';
  }
  goBackHome() {
    this.navCtrl.navigateBack('/home');
  }

  addPen(){
    this.navCtrl.navigateBack('/penalization');

  }
}
