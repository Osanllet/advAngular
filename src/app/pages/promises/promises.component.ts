import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    });

    // const promesa = new Promise( (resolve, reject) => {
    //   if (false) {
    //     resolve('Hola mundo');
    //   } else  {
    //     reject('Algo salió mal.');
    //   }
    // });

    // promesa.then( (mensaje) => {
    //   console.log('Fin de promesa', mensaje);
    // })
    // .catch( error => console.log('Error en mi promesa:', error) );

    // console.log('Fin del Init');

  }

  getUsuarios() {

    return new Promise( resolve => {

      fetch('https://reqres.in/api/users')
        .then( res => res.json() )
        .then( body => resolve(body.data) );

    });

  }

}
