import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BaseService } from './base.service';
import { UserCredentials, StatusResponse } from '../models/authentication';

@Injectable()
export class AuthenticationService extends BaseService {
    constructor(private http: HttpClient) {
        super(http);
    }

    authenticationBaseUrl = this.backendUrl + 'authentication/';

    private getUrl(childUrl) {
        return this.authenticationBaseUrl + childUrl;
    }

    private getRegisterUrl() {
        return this.getUrl('register');
    }

    private getLoginUrl() {
        return this.getUrl('login');
    }

    async register(userCredentials: UserCredentials): Promise<StatusResponse> {
        try {
            const res = await this.http.post<StatusResponse>(this.getRegisterUrl(), userCredentials)
                .toPromise();
            return res;
        }
        catch (err) {
            return err.error;
        }
    }

    async login(userCredentials: UserCredentials): Promise<StatusResponse> {
        try {
            const res = await this.http.post<StatusResponse>(this.getLoginUrl(), userCredentials)
                .toPromise();
            return res;
        }
        catch (err) {
            return err.error;
        }
    }
}