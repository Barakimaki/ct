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
  testId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {
  }

  startSession(testId: number, userId: number): Observable<{ sessionId: number }> {
    return this.http.post<{ sessionId: number }>(`${this.apiUrl}/sessions/start`, {
      testId,
      userId,
    })
  }

  submitAnswer(sessionId: number, questionId: number, selectedAnswers: string[]) {
    return this.http.post(`${this.apiUrl}/sessions/submit`, {
      sessionId,
      questionId,
      selectedAnswers,
    });
  }

  getResults(sessionId: number): Observable<{
    sessionId: number;
    totalQuestions: number;
    correctAnswers: number;
    questions: any[];
  }> {
    console.log('getResults', sessionId);
    return this.http.get<{
      sessionId: number;
      totalQuestions: number;
      correctAnswers: number;
      questions: Array<{
        questionId: number;
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

  getTestById(testId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/tests/${testId}`);
  }

  getQuestionsByTestId(testId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/questions/test/${testId}`);
  }

  deleteQuestion(questionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/questions/${questionId}`);
  }
}
