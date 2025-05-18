import {Component} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatAnchor, MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    MatAnchor,
    RouterLink,
    NgIf,
    MatButton,
    MatToolbar
  ],
  standalone: true
})
export class AppComponent {
  constructor(public authService: AuthService) {
  }
}
