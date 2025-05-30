import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute, Router, RouterLink,
} from '@angular/router';
import {
  ResultService,
} from './result.service';
import {TestResult} from "./result.model";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatProgressBar} from "@angular/material/progress-bar";
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatProgressBar,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatCardActions,
    MatButton,
    RouterLink,
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class ResultsComponent implements OnInit {
  sessionId!: number;
  result!: TestResult;

  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const sessionQueryParam = this.route.snapshot.queryParamMap.get('sessionId');
    this.sessionId = sessionQueryParam ? +sessionQueryParam : 0;
    this.loadResults();
  }

  loadResults(): void {
    this.resultService.getResults(this.sessionId).subscribe((data) => {
      this.result = data;
    });
  }

  getLabelColor(percentage: number): string {
    if (percentage >= 75) return 'primary';
    if (percentage >= 50) return 'accent';
    return 'warn';
  }

  repeatTest(): void {
    this.router.navigate(['/repeat', this.sessionId]);
  }

  get incorrectAnswers() {
    return this.result.questions.filter((q) => !q.isCorrect);
  }
}
