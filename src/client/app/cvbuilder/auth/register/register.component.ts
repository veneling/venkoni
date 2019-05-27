import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordsMatchValidator } from './passwordsValidator.directive';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';

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
  }, 
  { 
    validator: passwordsMatchValidator 
  });

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
    console.log(this.registrationForm.value);
    this.authService.register(this.registrationForm.value)
    .pipe(first())
    .subscribe(
      data => {
        //save the jwt token, log the user and redirect to the CV dashboard
        console.log('user created as ' + JSON.stringify(data));
        this.router.navigate(['login'])
      },
      error => {
        // display the error message and reload the register page
        console.log('error' + JSON.stringify(error));
      });
      
  }
}
