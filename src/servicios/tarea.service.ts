import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { Tarea } from 'src/clases/tarea';
import { Penalization } from 'src/clases/penalization';
import { PenalizationOrokorra } from 'src/clases/penalization-orokorra';
import { TareaGeneral } from 'src/clases/tarea-general';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  //private apiUrl = 'https://hometaskapi-1.onrender.com/Tarea/'; // Cambia la URL según corresponda
  private apiUrl = 'https://localhost:44379/Tarea/';
  constructor(private http: HttpClient) { }

  httpOptions(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
  }
  

  deleteTarea(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl+id.toString()).pipe(
      retry(5),  // Reintentar hasta 5 veces en caso de error
      catchError((error) => {
        console.error('Error al obtener las tareas:', error);
        throw error;  // Lanza el error para manejarlo fuera si es necesario
      })
    );;
  }

  getTareasGenerales(): Observable<TareaGeneral[]> {
    return this.http.get<TareaGeneral[]>(this.apiUrl+'general')
      .pipe(
        retry(5),  // Reintentar hasta 5 veces en caso de error
        catchError((error) => {
          console.error('Error al obtener las tareas:', error);
          throw error;  // Lanza el error para manejarlo fuera si es necesario
        })
      );
  }

  getPenalizations(): Observable<PenalizationOrokorra[]>{
    return this.http.get<PenalizationOrokorra[]>(this.apiUrl+'penalizations')
      .pipe(
        retry(5),  // Reintentar hasta 5 veces en caso de error
        catchError((error) => {
          console.error('Error al obtener las tareas:', error);
          throw error;  // Lanza el error para manejarlo fuera si es necesario
        })
      );
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

  updateTarea(id: string, tarea: Tarea): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl+id, JSON.stringify(tarea), this.httpOptions()).pipe(
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

  getTarea(id: string): Observable<Tarea>{
    return this.http.get<Tarea>(this.apiUrl+id)
      .pipe(
        retry(5),  // Reintentar hasta 5 veces en caso de error
        catchError((error) => {
          console.error('Error al obtener las tareas:', error);
          throw error;  // Lanza el error para manejarlo fuera si es necesario
        })
      );
  }


}
