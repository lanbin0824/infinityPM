import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';

import 'rxjs';

import { RequestList } from './../models/request-list-model';

@Injectable()
export class RequestListService {
    constructor(private http: Http) {};

    getRequestListData() {
        // let requestListDataUrl = 'assets/testdata.json';
        let requestListDataUrl = './api/index/getRequestList.action';
        let params = new URLSearchParams();
        params.set('refresh_flg','refresh');
        // params.set('page','1');
        // params.set('start','0');
        // params.set('limit','25');
        return this.http.get(requestListDataUrl, {
                search: params
            }).toPromise()
            .then(res => res.json())
            .catch(this.handleError)
    }

    getCompareData(options?:any) {
        let compareDataUrl = './api/index/initcompare.action';
        let params = new URLSearchParams();
        params.set('leftfilepath',options.leftfilepath);
        params.set('rightversion',options.rightversion);
        params.set('rightfilepath',options.rightfilepath);
        params.set('parameterlist',options.parameterlist);
        params.set('eventstatus',options.eventstatus);
        params.set('eventid',options.eventid);
        params.set('eventFlag',options.eventFlag);
        params.set('page','1');
        params.set('start','0');
        params.set('limit','25');
        return this.http.post(compareDataUrl,params).toPromise()
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