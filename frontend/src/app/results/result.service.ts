import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestResult } from './result.model';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private apiUrl = 'http://localhost:3000/sessions';

  constructor(private http: HttpClient) {}

  getResults(sessionId: string): Observable<TestResult> {
    return this.http.get<TestResult>(`${this.apiUrl}/${sessionId}/results`);
  }
}
