import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { TestService } from '../../test/test.service';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {NgForOf, NgIf} from "@angular/common";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {Subject} from "../../subjects/subject.model";
import {SubjectService} from "../../subjects/subject.service";
import {MatDivider} from "@angular/material/divider";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

export interface CreateQuestionFormModel {
  testId: string;
  text: string;
  options: string[];
  correctAnswers: string[];
  explanation: string;
  type: 'single' | 'multiple' | 'open';
}

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  imports: [
    MatFormField,
    FormsModule,
    MatButton,
    MatInput,
    MatOption,
    NgForOf,
    MatSelect,
    NgIf,
    MatIcon,
    MatIconButton,
    MatLabel,
    MatDivider,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCard
  ],
  standalone: true
})
export class AddQuestionsComponent implements OnInit {
  testId!: string;
  testName: string = '';
  subjects: Subject[] = [];

  model: CreateQuestionFormModel = {
    testId: '',
    text: '',
    options: [''],
    correctAnswers: [],
    explanation: '',
    type: 'single' as const,
  };

  questions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('testId')!;
    this.model.testId = this.testId;

    this.loadTestInfo(this.testId);
    this.loadSubjects();
    this.loadQuestions(this.testId);
  }

  loadTestInfo(testId: string) {
    this.testService.getTestById(testId).subscribe((test) => {
      this.testName = test.title;
    });
  }

  loadSubjects(): void {
    this.subjectService.getAll().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }

  loadQuestions(testId: string): void {
    this.testService.getQuestionsByTestId(testId).subscribe((questions) => {
      this.questions = questions;
    });
  }

  addOption() {
    this.model.options.push('');
  }

  removeOption(index: number) {
    if (this.model.options.length > 1) {
      this.model.options.splice(index, 1);
    }
  }

  submitQuestion() {
    this.testService.addQuestion(this.model).subscribe(() => {
      this.questions.push({ ...this.model });
      this.resetForm();
    });
  }

  resetForm() {
    this.model.text = '';
    this.model.options = [''];
    this.model.correctAnswers = [];
    this.model.explanation = '';
    this.model.type = 'single';
  }

  finishTest() {
    alert('Все вопросы добавлены!');
    this.router.navigate(['/tests']);
  }

  deleteQuestion(questionId: string) {
    this.testService.deleteQuestion(questionId).subscribe(() => {
      this.questions = this.questions.filter(q => q.id !== questionId);
    });
  }
}
