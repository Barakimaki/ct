import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute, Router,
} from '@angular/router';
import { TestService } from '../test/test.service';
import { RepeatQuestion } from './repeat.model';
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-repeat',
  templateUrl: './repeat.component.html',
  styleUrls: ['./repeat.component.scss'],
  imports: [
    MatCheckbox,
    FormsModule,
    MatButton,
    NgIf,
    MatCard,
    MatCardContent,
    MatRadioGroup,
    MatRadioButton,
    NgForOf,
    MatFormField,
    MatInput
  ],
  standalone: true
})
export class RepeatComponent implements OnInit {
  sessionId!: string;
  questions: RepeatQuestion[] = [];
  currentQuestionIndex = 0;
  selectedAnswers: string[] = [];
  isSubmitted = false;
  isCorrect: boolean | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId')!;
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.testService.getResults(this.sessionId).subscribe((result) => {
      this.questions = result.questions.filter((q: any) => !q.isCorrect);
      if (this.questions.length === 0) {
        alert('Нет неправильных вопросов для повторения');
        this.router.navigate(['/results', this.sessionId]);
      }
    });
  }

  get currentQuestion(): RepeatQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  selectAnswer(option: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedAnswers.push(option);
    } else {
      const index = this.selectedAnswers.indexOf(option);
      if (index > -1) {
        this.selectedAnswers.splice(index, 1);
      }
    }
  }

  onSubmitAnswer(): void {
    if (this.selectedAnswers.length === 0) return;
    this.isSubmitted = true;

    this.testService.submitAnswer(this.sessionId, this.currentQuestion.id, this.selectedAnswers).subscribe((res: any) => {
      this.isCorrect = res.isCorrect;
    });
  }

  onNextQuestion(): void {
    this.currentQuestionIndex++;
    this.selectedAnswers = [];
    this.isSubmitted = false;
    this.isCorrect = null;

    if (this.currentQuestionIndex >= this.questions.length) {
      alert('Вы повторили все ошибки!');
      this.router.navigate(['/results', this.sessionId]);
    }
  }
}
