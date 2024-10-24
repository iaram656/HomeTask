import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/servicios/user.service';
import { User } from 'src/clases/user';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  usuarios: User[] = [];

  constructor(private userService: UserService, private navCtrl: NavController ) {}

  ngOnInit() {
    this.obtenerUsuarios();
  }

  goBackHome() {
    this.navCtrl.navigateBack('/home'); // Cambiar '/home' a la ruta correcta si es necesario
  }

  obtenerUsuarios() {
    this.userService.getUsers().subscribe((usuarios: User[]) => {
      // Ordenar usuarios por puntos de forma descendente
      this.usuarios = usuarios.sort((a, b) => b.puntos - a.puntos);
    });
  }

  getUserImage(user: User): string {
    return `assets/images/${user.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  }
}
