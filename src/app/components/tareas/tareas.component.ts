import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/servicios/tarea.service';
import { Tarea } from 'src/clases/tarea';
import { UserService } from 'src/servicios/user.service';
import { User } from 'src/clases/user';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  tareas: Tarea[] = [];
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

  tareasFiltradas: Tarea[] = []; // Para almacenar las tareas filtradas por usuario
  filteredTareas: Tarea[] = []; // Para almacenar las tareas filtradas por fecha

  selectedDate: Date = new Date(); // Fecha seleccionada

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private router: Router,
    private userService: UserService,
    private navCtrl: NavController
  ) {
    this.tareaForm = this.fb.group({
      users: [''],
    });

    // Filtro de tareas por usuario al cambiar el valor
    this.tareaForm.get('users')?.valueChanges.subscribe((selectedUserId) => {
      this.filtrarTareas(selectedUserId);
      this.filterTasksByDate();
    });
  }

  ngOnInit() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter() {
    this.obtenerTareas();
    this.userService.getUsers().subscribe((c) => {
      this.usuarios = c;
    });
  }

  obtenerTareas() {
    this.tareaService.getTareas().subscribe(
      (data: Tarea[]) => {
        this.tareas = data.sort((a, b) => {
          const fechaA = new Date(a.limitDate).getTime();
          const fechaB = new Date(b.limitDate).getTime();
          return fechaB - fechaA;
        });

        this.cargando = false;
        this.tareasFiltradas = this.tareas;
        this.filterTasksByDate(); // Filtro inicial por fecha seleccionada
      },
      (error: any) => {
        console.error('Error al obtener las tareas', error);
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

  filtrarTareas(selectedUserId: string) {
    if (selectedUserId) {
      this.tareasFiltradas = selectedUserId === '6' ? this.tareas : this.tareas.filter(tarea => tarea.userId.toString() === selectedUserId);
    } else {
      this.tareasFiltradas = this.tareas;
    }
    this.filterTasksByDate(); // Filtrar también por fecha seleccionada
  }

  filterTasksByDate() {
    // Filtro por fecha seleccionada o fechas futuras
    this.filteredTareas = this.tareasFiltradas.filter((tarea) => {
      const tareaDate = new Date(tarea.limitDate);
      return tareaDate >= this.selectedDate;
    });
  }

  nextDay() {
    this.selectedDate = new Date(this.selectedDate.getTime());

    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.filterTasksByDate();
  }

  previousDay() {
    this.selectedDate = new Date(this.selectedDate.getTime());

    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.filterTasksByDate();
  }

  editTarea(tarea: Tarea) {
    this.router.navigate(['/edit-tarea', tarea.id]);
  }

  goBackHome() {
    this.navCtrl.navigateBack('/home');
  }
}
