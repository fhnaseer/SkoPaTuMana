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
    this.userCredentials = {
      username: '',
      password: ''
    }
  }

  register() {
    this.authenticationService.register(this.userCredentials).then(res => {
      if (res.status != 200) {
        this.userCredentials.username = res.message;
      } else {
        this.router.navigate(['/']);
      }
    })
  }
}
