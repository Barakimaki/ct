import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from './test.model';
import { TestsService } from './tests.service';
import { Router } from '@angular/router';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class TestsComponent implements OnInit {
  subjectId!: string;
  tests: Test[] = [];

  constructor(
    private route: ActivatedRoute,
    private testService: TestsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.paramMap.get('subjectId')!;
    this.loadTests();
  }

  loadTests(): void {
    this.testService.getBySubjectId(this.subjectId).subscribe((data) => {
      this.tests = data;
    });
  }

  startTest(testId: string): void {
    this.router.navigate(['/test', testId]);
  }
}
