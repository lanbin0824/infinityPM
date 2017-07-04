import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs';

import { RequestList } from './../models/request-list-model';

@Injectable()
export class RequestListService {
    constructor(private http: Http) {};

    getRequestListData() {
        let requestListDataUrl = 'assets/testdata.json';
        return this.http.get(requestListDataUrl)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    getCompareData() {
        let compareDataUrl = 'assets/comparedata.json';
        return this.http.get(compareDataUrl)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    getCompareListData() {
        return this.http.get('assets/camparelist.json')
                    .toPromise()
                    .then(res => res.json());
    }

    getScanMode() {
        return this.http.get('assets/scanmode.json')
                    .toPromise()
                    .then(res => res.json());
    }

    private handleError(error: any) {
        console.error('An error occurred: '+error);
        return Promise.reject(error.message || error);
    }
}