import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    MatButton,
    RouterLink,
    MatCardContent,
    MatCardTitle,
    MatCard
  ],
  standalone: true
})
export class HomeComponent {}
