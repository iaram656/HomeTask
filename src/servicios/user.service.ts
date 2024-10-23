import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { User } from 'src/clases/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://192.168.0.20:5020/User/'; // Cambia la URL según corresponda
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl).pipe(
      retry(5),  // Reintentar hasta 5 veces en caso de error
      catchError((error) => {
        console.error('Error al obtener las tareas:', error);
        throw error;  // Lanza el error para manejarlo fuera si es necesario
      })
    );;
  }
}