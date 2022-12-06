import { Component, OnInit } from '@angular/core';

import { ExchangeService } from 'src/app/core/services/exchange.service';


@Component({
  selector: 'ew-divisas',
  templateUrl: './divisas.component.html',
  styleUrls: ['./divisas.component.scss']

})
export class DivisasComponent implements OnInit {
exchange:any=[];


   

  

  
  



  constructor(
    private exchangeService: ExchangeService,
  ) { }

  ngOnInit(): void {
    this.exchangeService.get().subscribe(( data) => {
      console.log(data)
      this.exchange= (data);

      })
  }

}
