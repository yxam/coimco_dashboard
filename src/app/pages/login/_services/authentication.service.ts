import {  Injectable  } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import {  Observable  } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService{
  constructor(private http:Http){}

  login(username: string, password: string): Observable<void>{
    let body = JSON.stringify({mail:username, pass:password});
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post('https://coimco.herokuapp.com/login', body, headers)
          .map((response : Response)=> {
            let user = response.json();
            if(user && user.token){
              localStorage.setItem('currentUser', JSON.stringify(user.data));
              localStorage.setItem('tokenUser', JSON.stringify(user.token));
            }
          });
  }
  logout(){
    console.log("HOLA");
    localStorage.removeItem('currentUser');

  }
}
