import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editUserNamesForm = this.fb.group({
    firstName:      [ '', Validators.required ],
    lastName:       [ '', Validators.required ],
  })

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  @Input() firstName: string;
  @Input() lastName: string;
  user: Observable<{firstName: string, lastName: string}>;

  ngOnInit() {     
    this.auth.profile().subscribe(user => { 
      console.log(user)
      this.user = user;
    });
  }

  submitEditUserNamesForm() {
    console.log('change names initiated')
  }
}
