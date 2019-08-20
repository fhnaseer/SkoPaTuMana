import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserCredentials } from 'src/app/models/authentication';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  userCredentials: UserCredentials;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  username = '';
  password = ''

  register() {
    this.userCredentials = {
      username: this.username,
      password: this.password
    }
    this.authenticationService.register(this.userCredentials).then(res => {
      if (res.status != 200) {
        this.username = res.message;
      } else {
        this.router.navigate(['/']);
      }
    })
  }
}
