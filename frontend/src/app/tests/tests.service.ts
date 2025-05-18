import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from './test.model';

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  private apiUrl = 'http://localhost:3000/tests';

  constructor(private http: HttpClient) {}

  getBySubjectId(subjectId: string): Observable<Test[]> {
    return this.http.get<Test[]>(`${this.apiUrl}?subjectId=${subjectId}`);
  }
}
