import { Component, OnInit } from '@angular/core';
import {SubjectService} from "../../subjects/subject.service";
import {Subject} from "../../subjects/subject.model";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  imports: [
    MatCard,
    NgForOf,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatIconButton,
    NgIf
  ],
  standalone: true
})
export class SubjectsListComponent implements OnInit {
  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getAll().subscribe(subjects => {
      this.subjects = subjects;
    });
  }

  deleteSubject(id: string) {
    if (confirm('Удалить этот предмет?')) {
      this.subjectService.delete(id).subscribe(() => {
        this.subjects = this.subjects.filter(s => s.id !== id);
      });
    }
  }
}
