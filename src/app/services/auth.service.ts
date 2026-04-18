import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: string;
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:3000/api/auth';

  currentUser = signal<User | null>(null);

  constructor() {
    this.loadUser();
  }

  private loadUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser.set(JSON.parse(user));
    }
  }

  login(credentials: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUser.set(res.user);
      })
    );
  }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  updateProfile(userData: any) {
    return this.http.patch<any>(`${this.apiUrl}/profile`, userData).pipe(
      tap(res => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.currentUser.set(res.user);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
