import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Remplacez par l'URL de votre backend PHP
  isLoggedIn: boolean = false; // Statut de connexion
  userRole: string = ''; // Rôle de l'utilisateur
  userName: string = '';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, { email, password });
  }

  checkSession(): Observable<any> {
    return this.http.get(`${this.apiUrl}/check_session.php`);
  }

  logout(): Observable<any> {
    this.isLoggedIn = false; // Réinitialiser les valeurs
    this.userRole = '';
    return this.http.get(`${this.apiUrl}/logout.php`);
  }

  setUserRole(role: string, userName: string): void {
    this.isLoggedIn = true;
    this.userName = userName;
    this.userRole = role;
  }
}
