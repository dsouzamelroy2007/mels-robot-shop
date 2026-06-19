import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IRegisterUser } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'bot-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: IRegisterUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  registrationError = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.registrationError = '';
    this.userService.register(this.user).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => {
        this.registrationError =
          err?.error?.message || 'Registration failed. Please try again.';
      },
    });
  }
}
