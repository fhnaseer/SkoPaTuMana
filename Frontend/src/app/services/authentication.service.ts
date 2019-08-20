import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BaseService } from './base.service';
import { UserCredentials } from '../models/authentication';

@Injectable()
export class AuthenticationService extends BaseService {
    constructor(private http: HttpClient) {
        super(http);
    }

    authenticationBaseUrl = this.backendUrl + 'authentication/';

    private getRegisterUrl() {
        return this.authenticationBaseUrl + 'register';
    }

    register(userCredentials: UserCredentials) {
        this.http.post(this.getRegisterUrl(), userCredentials)
            .toPromise()
            .then(res => {
                console.log(res);
                return 'yay';
            })
            .catch(err => {
                console.log(err);
                return 'nay';
            })
    }
}