import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from 'src/clases/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'https://localhost:7055/Tarea/'; // Cambia la URL según corresponda

  constructor(private http: HttpClient) { }

  httpOptions(){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
  }
  addTarea(tarea: Tarea): Observable<boolean> {
    tarea.userId = 0;
    return this.http.post<boolean>(this.apiUrl, JSON.stringify(tarea), this.httpOptions());
  }


}
