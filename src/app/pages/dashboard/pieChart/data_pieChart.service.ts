import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class Data_pieChart{
  token: string;
  data: any;


  constructor(private http: Http) {
    this.token = localStorage.getItem('tokenUser');
  }
  private extractData(res: Response) {
    let body = res.json();
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

  getData(){

    const auth = JSON.parse(this.token);
    const aux = `Baerer ${auth}`;
    /*
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `${aux}`});
      */
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', aux);



    const options = new RequestOptions({ headers: headers});
      console.log(headers);

      return this.http.get('https://861a60bd.ngrok.io/api/products', headers)
                    .subscribe((response: Response) => {
                      const data = response.json();
                    });

}


}
