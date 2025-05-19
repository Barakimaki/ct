import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Test} from "./test.model";
import {Question} from "./question.model";

export interface CreateQuestionDto {
  text: string;
  options: string[];
  correctAnswers: string[];
  explanation?: string;
  type: 'single' | 'multiple' | 'open';
  testId: string;
}

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  startSession(testId: string, userId: string = 'user-123'): Observable<{ sessionId: string }> {
    return this.http.post<{ sessionId: string }>(`${this.apiUrl}/sessions/start`, {
      testId,
      userId,
    });
  }

  submitAnswer(sessionId: string, questionId: string, selectedAnswers: string[]) {
    return this.http.post(`${this.apiUrl}/sessions/submit`, {
      sessionId,
      questionId,
      selectedAnswers,
    });
  }

  getResults(sessionId: string): Observable<{
    sessionId: string;
    totalQuestions: number;
    correctAnswers: number;
    questions: any[];
  }> {
    return this.http.get<{
      sessionId: string;
      totalQuestions: number;
      correctAnswers: number;
      questions: Array<{
        questionId: string;
        text: string;
        options: string[];
        correctAnswers: string[];
        explanation?: string;
        type: 'single' | 'multiple' | 'open';
        isCorrect: boolean;
      }>;
    }>(`${this.apiUrl}/sessions/${sessionId}/results`);
  }

  createTest(dto: any): Observable<Test> {
    return this.http.post<Test>(`${this.apiUrl}/tests`, dto);
  }

  addQuestion(dto: CreateQuestionDto): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/questions`, dto);
  }

  getTestById(testId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tests/${testId}`);
  }

  getQuestionsByTestId(testId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/questions/test/${testId}`);
  }

  deleteQuestion(questionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/questions/${questionId}`);
  }
}
