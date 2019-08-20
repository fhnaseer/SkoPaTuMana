import { Component, OnInit } from '@angular/core';

import { UserCredentials } from 'src/app/models/authentication';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  userCredentials: UserCredentials;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  username = '';
  password = ''

  register() {
    this.userCredentials = {
      username: this.username,
      password: this.password
    }
    this.authenticationService.register(this.userCredentials);
  }
}
