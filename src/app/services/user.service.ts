import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';

import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;

  constructor( private http: HttpClient,
               private router: Router ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validateToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((res: any) => {
        const { email, google, img = '', name, role, uid } = res.user;
        this.user = new User(name, email, '', img, google, role, uid);

        localStorage.setItem('token', res.token);
        return true;
      }),
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

  updateUser( formData: { name: string, email: string } ) {
    return this.http.put(`${base_url}/users/${ this.uid }`, formData, {
      headers: {
        'x-token': this.token
      }
    });
  }
}
