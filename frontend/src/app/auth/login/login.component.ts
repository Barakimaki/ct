import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth.service';
import {LoginDto} from "../auth.model";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    FormsModule,
    MatFormField,
    MatInput,
    MatCardActions,
    MatLabel,
    MatError,
    RouterLink,
    MatButton,
    NgIf
  ],
  standalone: true
})
export class LoginComponent {
  model: LoginDto = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    this.authService.login(this.model).subscribe(() => {
      this.router.navigate(['/dashboard']);
    }, err => {
      alert('Ошибка входа');
    });
  }
}
