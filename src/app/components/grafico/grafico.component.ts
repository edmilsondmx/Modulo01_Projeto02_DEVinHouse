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

  //variavel de condicional do grafico
  mostrarGrafico:boolean = false;

  //variável qu guarda a lista de gerações em json-server
  listaGeracao:IGeracao[] = [];  

  constructor(
    private unidadeService:UnidadesService,
    private graficoService:GraficoService) { }

  
  ngOnInit(): void {
    this.buscarGeracao()
  }

  //Configuração do gráfico em linha
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

  //metodo que busca as gerações do json-server, busca informações do service e coloca nas configurações do grafico
  buscarGeracao(){
    this.unidadeService.devolverGeracao()
    .subscribe((result:IGeracao[]) =>{
      this.listaGeracao = result; 
      this.buscarGrafico(this.listaGeracao)
    })
  }

  //método que chama a função que gera a informações do gráfico
  buscarGrafico(geracao:IGeracao[]){
    this.graficoService.valoresKw = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.graficoService.gerarGrafico(geracao);
    this.lineChartData.datasets[0].data = this.graficoService.valoresKw
    this.mostrarGrafico = true;
  }
  
}

