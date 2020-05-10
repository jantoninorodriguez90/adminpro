import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription:Subscription;

  constructor() { 

    this.subscription = this.returnObservable()
    .subscribe(
      numero => console.log('Subs: ', numero),
      err => console.error('Error: ', err),
      () => console.log('El Observable Termino!')
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  returnObservable():Observable<any>{
    return new Observable( (observer:Subscriber<any>) => {
      
      let count = 0;
      let interval = setInterval( () => {
        
        count++;
        let exit = {
          valor:count
        }
        observer.next(exit);
        
        // if(count === 3){
        //   clearInterval(interval);
        //   observer.complete();
        // }

      }, 1000);

    }).pipe(
      map(resp => {
        return resp.valor;
      }),
      filter((valor, index) => {

        if( (valor % 2) === 1){
          return true;
        }else{
          return false;
        }

      })
    )

  }

}
