import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm = this.fb.group({
    email: [ '', Validators.required ],
    password: [ '', Validators.required ]
  });
  public error: string;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router,
              private snackBar: MatSnackBar) { }

  get password() {
    return this.loginForm.get('password').value;
  }

  get email() {
    return this.loginForm.get('email').value;
  }

  public submit() {
    this.auth.login(this.email, this.password)
      .pipe(first())
      .subscribe(
        () => this.router.navigate(['cvbuilder']),
        error => {
          this.snackBar.open(error.error.error,'', { duration: 5000 });
        }
      );
  }

}
