import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { Tarea } from 'src/clases/tarea';
import { Penalization } from 'src/clases/penalization';

@Injectable({
  providedIn: 'root'
})
export class PenalizationService {
  private apiUrl = 'https://hometaskapi-1.onrender.com/Penalization/'; // Cambia la URL según corresponda

  constructor(private http: HttpClient) { }

  httpOptions(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
  }
  addPenalization(pen: Penalization): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, JSON.stringify(pen), this.httpOptions()).pipe(
      retry(5),  // Reintentar hasta 5 veces en caso de error
      catchError((error) => {
        console.error('Error al obtener las tareas:', error);
        throw error;  // Lanza el error para manejarlo fuera si es necesario
      })
    );;
  }

  getPenalizations(): Observable<Penalization[]> {
    return this.http.get<Penalization[]>(this.apiUrl)
      .pipe(
        retry(5),  // Reintentar hasta 5 veces en caso de error
        catchError((error) => {
          console.error('Error al obtener las tareas:', error);
          throw error;  // Lanza el error para manejarlo fuera si es necesario
        })
      );
  }

}
