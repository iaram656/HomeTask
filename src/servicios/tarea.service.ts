import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { Tarea } from 'src/clases/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'http://192.168.0.20:5020/Tarea/'; // Cambia la URL según corresponda

  constructor(private http: HttpClient) { }

  httpOptions(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
  }
  addTarea(tarea: Tarea): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, JSON.stringify(tarea), this.httpOptions()).pipe(
      retry(5),  // Reintentar hasta 5 veces en caso de error
      catchError((error) => {
        console.error('Error al obtener las tareas:', error);
        throw error;  // Lanza el error para manejarlo fuera si es necesario
      })
    );;
  }

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.apiUrl)
      .pipe(
        retry(5),  // Reintentar hasta 5 veces en caso de error
        catchError((error) => {
          console.error('Error al obtener las tareas:', error);
          throw error;  // Lanza el error para manejarlo fuera si es necesario
        })
      );
  }


}
