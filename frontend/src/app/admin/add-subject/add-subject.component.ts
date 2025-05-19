import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatCard, MatCardContent} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {SubjectService} from "../../subjects/subject.service";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  imports: [
    MatCard,
    MatCardContent,
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel
  ],
  standalone: true
})
export class AddSubjectComponent {
  model = {
    name: '',
  };

  constructor(
    private subjectService: SubjectService,
    private router: Router
  ) {}

  onSubmit() {
    this.subjectService.create(this.model).subscribe(() => {
      alert('Предмет успешно добавлен');
      this.router.navigate(['/admin/subjects']); // или куда нужно перенаправить
    });
  }
}
