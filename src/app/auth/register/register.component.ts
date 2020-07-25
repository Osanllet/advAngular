import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: [ 'Test100', Validators.required ],
    email: [ 'test100@gmail.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', Validators.required ],
    password2: [ '1234567', Validators.required ],
    terms: [ false, Validators.requiredTrue ]
  }, {
    validators: this.equalPasswords('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  createUser() {
    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser( this.registerForm.value )
        .subscribe( res => {
          this.router.navigateByUrl('/');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });


  }

  invalidField( field: string ): boolean {

    if ( this.registerForm.get(field).invalid && this.formSubmitted ) {
      return true;
    }

    return false;
  }

  passwordsNotMatch() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if ( (pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  acceptTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  equalPasswords( passField1: string, passField2: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(passField1);
      const pass2Control = formGroup.get(passField2);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null );
      } else {
        pass2Control.setErrors( {  isNotEqual: true } );
      }

    };

  }

}
