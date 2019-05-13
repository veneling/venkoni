import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordsMatchValidator } from './passwordsValidator.directive';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    email:       [ '', Validators.required ],
    password:       [ '', Validators.required ],
    repeatPassword: [ '', Validators.required ]
  }, { validator: passwordsMatchValidator });

  ngOnInit() { }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get repeatPassword() {
    return this.registrationForm.get('repeatPassword');
  }

  register() {
    this.authService.register(this.email.value, this.password.value, this.repeatPassword.value);
      
  }
}
