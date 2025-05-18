import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {
  RegisterDto,
  LoginDto,
  AuthResponse,
} from './auth.model';
import {UserTestResult} from "../dashboard/dashboard.model";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  register(dto: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, dto);
  }

  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dto).pipe(
      tap((res) => {
        localStorage.setItem('token', res.accessToken);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserStats(): Observable<UserTestResult[]> {
    return this.http.get<any[]>(`${this.usersUrl}/me/results`).pipe(
      map((data) =>
        data.map((item) => ({
          sessionId: item.sessionId || item.id, // поддержка разных названий
          testId: item.testId,
          testName: item.testName || 'Тест',
          subject: item.subject || 'Неизвестно',
          totalQuestions: item.totalQuestions,
          correctAnswers: item.correctAnswers,
          percentage: Math.round((item.correctAnswers / item.totalQuestions) * 100),
          completedAt: new Date(item.completedAt),
        }))
      )
    );
  }
}
