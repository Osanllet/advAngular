import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('Suscripción:', valor),
    //   error => console.error('Error', error),
    //   () => console.warn('Observable terminado')
    // );

    // this.retornaIntervalo().subscribe(
    //   valor => console.log(valor)
    // );

    this.intervalSubs = this.retornaIntervalo().subscribe( console.log );

   }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

   retornaIntervalo() {

    const intervalo$ = interval(100)
                        .pipe(
                          // take(10),
                          map( valor => valor + 1 ),
                          filter( valor => (valor % 2 === 0) ? true : false )
                        );
    return intervalo$;

   }

   retornaObservable(): Observable<number> {
     let i = -1;

     return new Observable<number>(observer => {

       const intervalo = setInterval(() => {
         i++;
         observer.next(i);

         if (i === 4) {
           clearInterval(intervalo);
           observer.complete();
         }

         if (i === 2) {
           observer.error('i llegó al valor de 2.');
         }

       }, 1000);
     });

   }

}
