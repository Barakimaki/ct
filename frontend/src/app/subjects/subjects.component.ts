import { Component, OnInit } from '@angular/core';
import { Subject } from './subject.model';
import { SubjectService } from './subject.service';
import { Router } from '@angular/router';
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  imports: [
    MatCard,
    MatCardContent,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class SubjectsComponent implements OnInit {
  subjects: Subject[] = [];

  constructor(
    private subjectService: SubjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subjectService.getAll().subscribe((data) => {
      this.subjects = data;
    });
  }

  goToTests(subjectId: number): void {
    this.router.navigate(['/tests', subjectId]);
  }
}
