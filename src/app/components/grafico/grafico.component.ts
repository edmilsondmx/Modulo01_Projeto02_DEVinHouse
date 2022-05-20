import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'pro-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  constructor() { }

  @ViewChild("grafico", {static: true}) elemento: ElementRef | any;
  ngOnInit(): void {
    new Chart(this.elemento.nativeElement, {
      options: {
        elements: {
          line: {
            tension: 0.5
          }
        },
      },
      type: 'line',
      data: {
        labels: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],

        datasets: [
          {
            data: [ 65, 59, 80, 81, 56, 55, 50, 100, 89, 50, 100, 150 ],
            label: 'Consumo Mensal',
            backgroundColor: '#00AEFF',
            borderColor: '#00AEFF',
            pointBackgroundColor: '#00AEFF',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: false,
          }
        ]
      },
    });
  }
}

