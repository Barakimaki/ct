import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../auth.service';
import {RegisterDto} from "../auth.model";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormsModule} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    FormsModule,
    MatFormField,
    MatInput,
    MatCardActions,
    RouterLink,
    MatButton,
    MatIcon,
    MatError,
    MatLabel,
    NgIf
  ],
  standalone: true
})
export class RegisterComponent {
  model: RegisterDto = {
    fullName: '',
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    this.authService.register(this.model).subscribe(() => {
      this.router.navigate(['/login']);
    }, err => {
      alert('Ошибка регистрации');
    });
  }
}
