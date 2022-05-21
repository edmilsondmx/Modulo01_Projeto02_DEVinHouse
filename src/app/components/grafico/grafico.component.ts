import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IGeracao } from 'src/app/models/interface';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'pro-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  mostrarGrafico:boolean = false;

  geracao:IGeracao[] = [];

  valoresKw:number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
  

  constructor(private unidadeService:UnidadesService) { }

  
  ngOnInit(): void {
    this.buscargeracao()
  }

  public lineChartData: ChartConfiguration['data'] = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        data: [],
        label: 'Total Kw/Mês',
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
        pointBackgroundColor: '#2196F3',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#2196F3',
        fill: false,
      }
    ]
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    plugins: {
      legend: { 
        display: true 
      },
      
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  

  buscargeracao(){
    this.unidadeService.devolverGeracao()
    .subscribe((result:IGeracao[]) =>{
      this.geracao = result; 
      this.gerarGrafico()
      this.lineChartData.datasets[0].data = this.valoresKw;
      this.mostrarGrafico = true;
    })
  }

  gerarGrafico(){
    this.geracao.forEach((item) => {
      if(item.data == '2022-01'){
        this.valoresKw[0] += item.kw;
      }else if(item.data == '2022-02'){
        this.valoresKw[1] += item.kw;
      }else if(item.data == '2022-03'){
        this.valoresKw[2] += item.kw;
      }else if(item.data == '2022-04'){
        this.valoresKw[3] += item.kw;
      }else if(item.data == '2022-05'){
        this.valoresKw[4] += item.kw;
      }else if(item.data == '2022-06'){
        this.valoresKw[5] += item.kw;
      }else if(item.data == '2022-07'){
        this.valoresKw[6] += item.kw;
      }else if(item.data == '2022-08'){
        this.valoresKw[7] += item.kw;
      }else if(item.data == '2022-09'){
        this.valoresKw[8] += item.kw;
      }else if(item.data == '2022-10'){
        this.valoresKw[9] += item.kw;
      }else if(item.data == '2022-11'){
        this.valoresKw[10] += item.kw;
      }else if(item.data == '2022-12'){
        this.valoresKw[11] += item.kw;
      }
    })
    
    
  }
  
}

