import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {
  TestService,
} from './test.service';
import {Question} from "./question.model";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {FormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  imports: [
    MatCard,
    NgIf,
    MatCardContent,
    MatRadioGroup,
    FormsModule,
    NgForOf,
    MatRadioButton,
    MatCheckbox,
    MatButton
  ],
  standalone: true
})
export class TestComponent implements OnInit, OnDestroy {
  testId!: string;
  questions: Question[] = [];
  currentQuestionIndex = 0;
  selectedAnswers: string[] = [];
  isSubmitted = false;
  isCorrect: boolean | null = null;

  timer: any;
  timeLeft = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('testId')!;
    this.loadTest();
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  loadTest(): void {
    this.testService.getQuestionsByTestId(this.testId).subscribe((questions) => {
      this.questions = questions;
      if (this.questions.length > 0) {
        this.startSession();
        this.startTimer(60 * 5); // 5 минут (пример)
      }
    });
  }

  startSession(): void {
    this.testService.startSession(this.testId, 'user-123').subscribe((res) => {
      console.log('Сессия начата:', res.sessionId);
    });
  }

  startTimer(minutes: number): void {
    this.timeLeft = minutes * 60;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        alert('Время вышло!');
        this.finishTest();
      }
    }, 1000);
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  selectAnswer(answer: string): void {
    if (this.currentQuestion.type === 'single') {
      this.selectedAnswers = [answer];
    } else if (this.currentQuestion.type === 'multiple') {
      const index = this.selectedAnswers.indexOf(answer);
      index === -1 ? this.selectedAnswers.push(answer) : this.selectedAnswers.splice(index, 1);
    }
  }

  onSubmitAnswer(): void {
    if (this.selectedAnswers.length === 0) return;

    this.isSubmitted = true;

    this.testService.submitAnswer(
      'session-123', // sessionId (временно)
      this.currentQuestion.id,
      this.selectedAnswers
    ).subscribe((res: any) => {
      this.isCorrect = res.isCorrect;
    });
  }

  onNextQuestion(): void {
    this.currentQuestionIndex++;
    this.selectedAnswers = [];
    this.isSubmitted = false;
    this.isCorrect = null;

    if (this.currentQuestionIndex >= this.questions.length) {
      this.finishTest();
    }
  }

  finishTest(): void {
    clearInterval(this.timer);
    this.router.navigate(['/results']);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  toggleMultiple(option: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedAnswers.push(option);
    } else {
      const index = this.selectedAnswers.indexOf(option);
      if (index > -1) {
        this.selectedAnswers.splice(index, 1);
      }
    }
  }
}
