import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public loginForm = this.fb.group({
    email: [ , [ Validators.required, Validators.email ] ],
    password: [ , Validators.required ],
    rememberMe: [false]
  });
  public email: string;
  public rememberMe: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 0 ) {
      this.rememberMe = true;
    }
  }

  login() {
    this.formSubmitted = true;

    if ( this.loginForm.invalid ) {
      return;
    }

    const formData = this.loginForm.value;

    this.userService.login( formData, formData.rememberMe )
        .subscribe( res => {
          this.router.navigateByUrl('/');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });


  }

  invalidField( field: string ): boolean {

    if ( this.loginForm.get( field ).invalid && this.formSubmitted ) {
      return true;
    }

    return false;

  }

}
