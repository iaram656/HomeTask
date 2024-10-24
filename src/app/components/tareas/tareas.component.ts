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
export class TareasComponent {
  tareas: Tarea[] = [];
  cargando : boolean = true;
  usuarios: User[] = [];
  tareaForm: FormGroup;
  userColors: { [key: string]: string } = {
    '0': '#ccc',
    '1': '#FFB3BA', // Pastel rojo
    '2': '#FFDFBA', // Pastel naranja
    '3': '#FFFFBA', // Pastel amarillo
    '4': '#BAFFC9', // Pastel verde
    '5': '#BAE1FF', // Pastel azul
    // Añade más usuarios y colores si es necesario
  };
  
  tareasFiltradas: Tarea[] = []; // Nueva propiedad para almacenar las tareas filtradas 
  constructor(private fb: FormBuilder,  private tareaService: TareaService,private router: Router, private userService: UserService, private navCtrl: NavController) {
    this.tareaForm = this.fb.group({
      users: [''],
    });
    this.tareaForm.get('users')?.valueChanges.subscribe(selectedUserId => {
      this.filtrarTareas(selectedUserId);
    });
  }
  ngOnInit(){
    this.ionViewWillEnter();
  }
  getUserColorById(userId: string): string {
    // Devuelve el color correspondiente al usuario o un color por defecto si no está asignado
    return this.userColors[userId] || '#888'; // Gris por defecto
  }
  filtrarTareas(selectedUserId: string) {
    if (selectedUserId) {
      this.tareasFiltradas = this.tareas.filter(tarea => tarea.userId.toString() === selectedUserId); // Filtra tareas por userId
    } else {
      this.tareasFiltradas = this.tareas; // Si no hay selección, muestra todas las tareas
    }
  }

  ionViewWillEnter() {
    console.log("bb");
    this.obtenerTareas();
    this.userService.getUsers().subscribe(c => {
      this.usuarios = c;
    });
  }

  getUserNameById(userId: number): string {
    const user = this.usuarios.find(u => u.id === userId); // Encuentra el usuario por ID
    return user ? user.name : 'Iño ez'; // Retorna el nombre o un mensaje si no se encuentra
  }

  
  

  obtenerTareas() {
    this.tareaService.getTareas().subscribe(
      (data: Tarea[]) => {
        // Ordenar las tareas por la fecha de límite (limitDate)
        this.tareas = data.sort((a, b) => {
          const fechaA = new Date(a.limitDate).getTime();  // Convertir la fecha a timestamp
          const fechaB = new Date(b.limitDate).getTime();
          return fechaB -fechaA; // Orden ascendente (más antigua primero)
        });
  
        this.cargando = false;
        this.tareasFiltradas = this.tareas;
      },
      (error: any) => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }
  

  editTarea(tarea: Tarea) {
    this.router.navigate(['/edit-tarea', tarea.id]); // Cambiar '/edit-tarea' a la ruta correcta si es necesario    
  }
  goBackHome() {
    this.navCtrl.navigateBack('/home'); // Cambiar '/home' a la ruta correcta si es necesario
  }
}
