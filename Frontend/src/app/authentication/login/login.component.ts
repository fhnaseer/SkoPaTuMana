import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserCredentials } from 'src/app/models/authentication';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userCredentials: UserCredentials;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.userCredentials = {
      username: '',
      password: ''
    }
  }

  login() {
    this.authenticationService.login(this.userCredentials).then(res => {
      if (res.status != 200) {
        this.userCredentials.username = res.message;
      } else {
        this.router.navigate(['/']);
      }
    })
  }
}
