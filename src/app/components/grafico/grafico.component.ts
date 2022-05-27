import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IGeracao } from 'src/app/models/interface';
import { GraficoService } from 'src/app/services/grafico.service';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'pro-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {

  mostrarGrafico:boolean = false;

  geracao:IGeracao[] = [];  

  constructor(
    private unidadeService:UnidadesService,
    private graficoService:GraficoService) { }

  
  ngOnInit(): void {
    this.buscarGeracao()
  }

  lineChartData: ChartConfiguration['data'] = {
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
  lineChartOptions: ChartConfiguration['options'] = {
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

  lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  

  buscarGeracao(){
    this.unidadeService.devolverGeracao()
    .subscribe((result:IGeracao[]) =>{
      this.geracao = result; 
      this.buscarGrafico(this.geracao)
      this.lineChartData.datasets[0].data = this.graficoService.valoresKw
      this.mostrarGrafico = true;
    })
  }

  buscarGrafico(geracao:IGeracao[]){
    this.graficoService.gerarGrafico(geracao);
  }
  
}

