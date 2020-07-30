import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';
import { SearchService } from '../../../services/search.service';
import { ModalImageService } from '../../../services/modal-image.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];

  public imgSubs: Subscription;
  public from = 0;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private modalImageService: ModalImageService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsers(this.from, 5);

    this.imgSubs = this.modalImageService.newImage.subscribe( img => this.getUsers(this.from, 5) );
  }

  getUsers(from: number = 0, items: number = 5) {
    this.loading = true;
    this.userService.getUsers(from, items)
        .subscribe( ({total, users}) => {
          this.totalUsers = total;
          this.users = users;
          this.usersTemp = users;
          this.loading = false;
        });
  }

  changePage( value: number ) {
    this.from += value;

    if ( this.from < 0  ) {
      this.from = 0;
    } else if ( this.from > this.totalUsers ) {
      this.from -= value;
    }

    if ( this.from > (this.totalUsers - value) && this.from <= this.totalUsers ) {
      document.getElementById('btn-next').style.display = 'none';
    } else {
      document.getElementById('btn-next').style.display = 'inline-block';
    }

    this.getUsers( this.from, 5 );
  }

  search( term: string ) {
    if (term.length === 0) {
      return this.users = this.usersTemp;
    }

    this.loading = true;

    this.searchService.search( 'users', term )
      .subscribe( res => {
        this.users = res;
        this.totalUsers = this.users.length;
        this.loading = false;
      });
  }

  deleteUser( user: User ) {

    if ( this.userService.uid === user.uid ) {
      return Swal.fire(
        'Error',
        'No puedes borrar tu registro.',
        'error'
      );
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Estás a punto de borrar a ${ user.name }.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo'
    }).then((result) => {
      if (result.value) {

        this.userService.deleteUser( user )
          .subscribe( res => {

            this.getUsers(this.from, 5);
            Swal.fire(
              'Borrado!',
              `${user.name} ha sido borrado correctamente`,
              'success'
            );

          });
      }
    });
  }

  changeRole( user: User ){
    this.userService.updateUserInfo( user )
        .subscribe( res => {
           console.log(res);
        });
  }

  openModal( user: User ) {
    this.modalImageService.openModal( 'users', user.uid, user.img );
  }

}
