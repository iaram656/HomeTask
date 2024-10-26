import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
  }
  goToTasksPage() {
    this.navCtrl.navigateForward('/tareas'); 

  }

  goToAddTaskPage() {
    this.navCtrl.navigateForward('/anadir-tarea'); 
  }

  goToRanking(){
    this.navCtrl.navigateForward('/ranking');
  }
  goToPenalizationsPage(){
    this.navCtrl.navigateForward('/penalizaziyuek');
  }
}
