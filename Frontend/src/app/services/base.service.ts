import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

@Injectable()
export abstract class BaseService {
    protected headers = new Headers({ 'Content-Type': 'application/json' });
    // protected options = new RequestOptions({ headers: this.headers });
    // protected authOptions = new RequestOptions({ headers: this.headers, withCredentials: true });
    protected backendUrl = environment.backendUrl;

    constructor(http: HttpClient) { }

    protected handleError(error: any): Promise<any> {
        // console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}