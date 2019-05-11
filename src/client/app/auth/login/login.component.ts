import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm = this.fb.group({
    username: [ '', Validators.required ],
    password: [ '', Validators.required ]
  });
  public error: string;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  get password() {
    return this.loginForm.get('password').value;
  }

  get username() {
    return this.loginForm.get('username').value;
  }

  public submit() {
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['']),
        err => this.error = 'Could not authenticate'
      );
  }

}
