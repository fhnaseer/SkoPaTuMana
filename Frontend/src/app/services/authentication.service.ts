import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BaseService } from './base.service';
import { UserCredentials } from '../models/authentication';

@Injectable()
export class AuthenticationService extends BaseService {
    constructor(private http: HttpClient) {
        super(http);
    }

    private getRegisterUrl() {
        return this.backendUrl + 'register';
    }

    async register(userCredentials: UserCredentials) {
        try {
            const res = await this.http.post<UserCredentials>(this.getRegisterUrl(), userCredentials)
                .toPromise();
            return 'yay';
        }
        catch (error) {
            console.log('error');
            return 'nay';
        }
    }
}