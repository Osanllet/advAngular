import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformUser( collection: any[] ): User[] {
     return collection.map( 
       user =>  new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
     );
  }

  search(
    type: 'users'|'hospitals'|'medics',
    term: string) {
    const url = `${base_url }/all/collection/${ type }/${ term }`;
    return this.http.get<any[]>(url, this.headers)
            .pipe(
              map( (res: any ) => {

                switch ( type ) {
                  case 'users':
                    return this.transformUser( res.results );
                    break;
 
                  default:
                    return [];
                    break;
                }

              })
            );

  }

}
