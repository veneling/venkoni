import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordsMatchValidator } from './passwordsValidator.directive';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    firstName:      [ '', Validators.required ],
    lastName:       [ '', Validators.required ],
    email:          [ '', Validators.required ],
    password:       [ '', Validators.required ],
    repeatPassword: [ '', Validators.required ]
  }, 
  { 
    validator: passwordsMatchValidator 
  });

  ngOnInit() { }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
              private snackBar: MatSnackBar) { }

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

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
    this.authService.register(this.registrationForm.value)
    .pipe(first())
    .subscribe(
      () => {
        this.router.navigate(['cvbuilder'])
      },
      error => {
        this.snackBar.open(error.error.message,'', { duration: 5000 });
      });
      
  }
}
