import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MatButton,
    RouterLink,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatCardHeader,
    NgForOf
  ],
  standalone: true
})
export class HomeComponent {
  features = [
    {
      title: 'Разные предметы',
      description: 'Выбирайте тест по нужному предмету: математика, русский, белорусский язык и другие.',
    },
    {
      title: 'Режимы прохождения',
      description: 'Тренировочный режим и экзаменационный режим с таймером.',
    },
    {
      title: 'Объяснения к вопросам',
      description: 'После ответа вы получаете объяснение правильного варианта.',
    },
    {
      title: 'Повтор ошибок',
      description: 'Автоматически формируем список вопросов, на которые вы отвечали неправильно.',
    },
  ];
}
