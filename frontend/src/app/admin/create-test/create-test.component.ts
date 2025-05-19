import {Component, OnInit} from '@angular/core';
import {TestService} from '../../test/test.service';
import {Router} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {SubjectService} from "../../subjects/subject.service";
import {Subject} from "../../subjects/subject.model";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatCard,
    MatCardContent,
    MatSelect,
    MatOption,
    NgForOf,
    MatLabel
  ],
  standalone: true
})
export class CreateTestComponent implements OnInit {
  subjects: Subject[] = [];
  model = {
    title: '',
    description: '',
    subjectId: '',
  };

  constructor(
    private testService: TestService,
    private router: Router, private subjectService: SubjectService) {
  }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getAll().subscribe((subjects) => {
      this.subjects = subjects;
    });
  }

  onSubmit() {
    this.testService.createTest(this.model).subscribe((res: any) => {
      // Предположим, сервер вернул test.id
      this.router.navigate(['/admin/add-questions', res.id]);
    });
  }
}
