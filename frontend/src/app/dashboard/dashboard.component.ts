import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserTestResult } from './dashboard.model';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    MatCard,
    NgForOf,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatProgressBar,
    MatCardActions,
    MatIcon,
    MatButton,
    RouterLink,
    DatePipe,
    NgIf
  ],
  standalone: true
})
export class DashboardComponent implements OnInit {
  results: UserTestResult[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserResults();
  }

  loadUserResults(): void {
    this.authService.getUserStats().subscribe((data) => {
      this.results = data.map((r: any) => ({
        ...r,
        percentage: Math.round((r.correctAnswers / r.totalQuestions) * 100),
      }));
    });
  }

  getLabelColor(percentage: number): string {
    if (percentage >= 75) return 'green';
    if (percentage >= 50) return 'orange';
    return 'red';
  }
}
