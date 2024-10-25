import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false; // Cambia esto según la lógica de tu autenticación

  constructor() { }

  // Método para iniciar sesión (ajusta esto a tu lógica real)
  login() {
    this.isLoggedIn = true; // Simulación de inicio de sesión
    localStorage.setItem('isLoggedIn', 'true'); // Almacenar en localStorage si es necesario
  }

  // Método para cerrar sesión
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    // Revisa el estado de autenticación
    return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }
}
