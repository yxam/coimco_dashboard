import { Injectable } from '@angular/core';
import { Http, Jsonp, Headers, Response, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Data_pieChart {
  token: string;
  data_json: any;


  constructor(private http: Http, private jsonp: Jsonp) {
    this.token = localStorage.getItem('tokenUser');
  }
  private extractData(res: Response) {
    const body = res.json();
    console.log(body.data);
    return body.data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  createHeaders() {
    const tokenuser = JSON.parse(this.token);
    const auth = `Bearer ${tokenuser}`;


    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', auth);
    const options = new RequestOptions({ 'headers': headers });
    return options;
  }

  createBody() {
    //AQUI QUEDE CREAR EL BODY AÚN NO SABEMOS SI ES NECESARIO
    return null;
  }
  getStats(currentUser: JSON): Observable<JSON[]> {
    const headers = this.createHeaders();
    const body = this.createBody();
    const user_id = currentUser['name'];
    const role = currentUser['role'];
    //const url = 'https://coimco.herokuapp.com/api/dashboard/'+ user_id +'/' + role;
    const url = 'http://coimco.herokuapp.com/api/products';
    return this.http.get(url, headers)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }


}
