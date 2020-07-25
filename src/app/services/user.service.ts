import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient,
               private router: Router ) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map( res => true ),
      catchError( err => of(false) )
    );

  }

  login( formData: LoginForm, rememberMe: boolean = false ) {

    if ( rememberMe ) {
      localStorage.setItem( 'email', formData.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    return this.http.post(`${ base_url }/login`, formData)
                .pipe(
                  tap( (res: any) => {
                    localStorage.setItem('token', res.token );
                  })
                );

  }

  createUser( formData: RegisterForm ) {

    return this.http.post(`${ base_url }/users`, formData)
                .pipe(
                  tap((res: any) => {
                    localStorage.setItem('token', res.token);
                  })
                );

  }
}
