import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class Data_pieChart{
  token: string;
  data: any;


  constructor(private http: Http) {
    this.token = localStorage.getItem('tokenUser');
  }
  private extractData(res: Response) {
    const body = res.json();
    console.log(body.data);
    return body.data || { };
  }

  private handleError (error: Response | any) {
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

  getData() {
    /*const tokenuser = JSON.parse(this.token);*/
   const tokenuser = JSON.parse(this.token);
    const auth = `Bearer ${tokenuser}`;


    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', auth);


    const options = new RequestOptions( { 'headers': headers } );

    console.log(headers);

    return this.http.get('https://2334fd9f.ngrok.io/api/products', options )
                    .map((response: Response) =>
                    this.data = response.json()
                  );

}


}
