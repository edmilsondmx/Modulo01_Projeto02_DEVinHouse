import { Component, OnInit } from '@angular/core';
import { IUnidades } from 'src/app/models/interface';

@Component({
  selector: 'pro-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  unidades:IUnidades[] = [
    {
      titulo:'Total unidades',
      quantidade: 60
    },
    {
      titulo:'Unidades Ativas',
      quantidade: 16
    },
    {
      titulo:'Unidades Inativas',
      quantidade: 43
    },
    {
      titulo:'Média de energia',
      quantidade: 64
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
