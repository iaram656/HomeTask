import { Component, OnInit } from '@angular/core';
import { TareaService } from 'src/servicios/tarea.service';
import { Tarea } from 'src/clases/tarea';
import { UserService } from 'src/servicios/user.service';
import { User } from 'src/clases/user';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  tareas: Tarea[] = [];
  cargando : boolean = true;
  usuarios: User[] = [];
  constructor(private tareaService: TareaService, private userService: UserService) {}

  ngOnInit() {
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
        this.tareas = data;
        this.cargando = false;
      },
      (error: any) => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }

  editTarea(tarea: Tarea) {
    console.log('Editar tarea', tarea);
    
  }
}
