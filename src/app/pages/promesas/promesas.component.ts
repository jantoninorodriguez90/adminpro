import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
    this.functCount()
      .then()
      .catch();
  }

  ngOnInit(): void {
  }

  functCount():Promise<boolean>{
    return new Promise( (resolve, reject) => {
      let count = 0;
      let interval = setInterval( () => {
        count += 1;
        console.log(count);

        if(count === 3){
          clearInterval(interval);
        }
      }, 1000);
    });
  }

}
