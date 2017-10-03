import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';


@Injectable()
export class BackendHttpService {

  private apiUrl = environment.apiUrl;
  constructor(private http: Http, private authHttp: AuthHttp) {
  }


  /**
    * Send a post request to the server api
    * @param path 
    * @param params 
    * @param data 
    */
  doPostLogin(path: String, params: String[], data: any): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.apiUrl.concat(`${path}`);
    //parameters
    if (params && params.length > 0) {
      params.forEach(p => {
        url = url.concat(`/${p}`);
      });
    }

    return this.http.post(url, data, options).catch(this.handleError);
  }

  /**
   * Send a post request to the server api
   * @param path 
   * @param params 
   * @param data 
   */
  doPostRequest(path: String, params: String[], data: any): Observable<any> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = this.apiUrl.concat(`${path}`);
    //parameters
    if (params && params.length > 0) {
      params.forEach(p => {
        url = url.concat(`/${p}`);
      });
    }
    return this.authHttp.post(url, data, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   *  Send a get request to the server api
   * @param path 
   * @param params 
   */
  doGetRequest(path: String, params: String[]): Observable<any> {

    let url = this.apiUrl.concat(`/${path}`);
    //parameters
    if (params && params.length > 0) {
      params.forEach(p => {
        url = url.concat(`/${p}`);
      });
    }
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }



  private extractData(res: Response) {
    return res.text() ? res.json() : {};
  }

  private handleError(error: Response | any) {
    console.log(error);
    let errMsg: Object;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = { status: error.status, statusText: error.statusText || '', msg: err };
    } else {
      errMsg = { msg: error.message || error.toString() };
    }

    return Observable.throw(errMsg);
  }

}
