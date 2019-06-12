import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService) { }

  firstName = sessionStorage.getItem('firstName');
  lastName = sessionStorage.getItem('lastName');

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }
}
