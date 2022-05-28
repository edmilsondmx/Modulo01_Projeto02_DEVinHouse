import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IGeracao, IUnidades } from 'src/app/models/interface';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'pro-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //listas de unidades e gerações consumidas do Json-server
  listaUnidades:IUnidades[] = [];
  listaGeracao:IGeracao[] = [];

  //variáveis onde são guardados os valores dos cards do dashboard
  totalDeUnidades:number = 0;
  unidadesAtivas:number = 0;
  unidadesInativas:number = 0;
  mediaDeEnergia:number | string = 0


  constructor(
    private unidadeService:UnidadesService,
    private serviceTitle: Title) { }

  ngOnInit(): void {
    this.serviceTitle.setTitle('Solar Energy - Dashboard');
    this.buscarUnidades();
  }

  //método que chama a função de buscar as unidades do json-server
  buscarUnidades(){
    this.unidadeService.devolverUnidade()
    .subscribe((result:IUnidades[]) =>{
      this.listaUnidades = result;
      this.totalunidades();
      this.isActive();
      this.mediaEnergia();
    })
  }

  //método que inclui a quantidade de unidades da lista na variavel
  totalunidades(){
    this.totalDeUnidades = this.listaUnidades.length;
  }

  //método que verifica a quantidade de unidades ativa e inativa e guarda na variavel
  isActive(){
    this.listaUnidades.forEach((item) => {
      if(item.isActive === true){
        this.unidadesAtivas += 1;
      } else{
        this.unidadesInativas += 1;
      }
    })
  }

  //método que tira a média de kw das unidades e guarda na variavel, se não tiver nenhuma geração ainda, é retornado 0
  mediaEnergia(){
    this.unidadeService.devolverGeracao()
    .subscribe((result:IGeracao[]) =>{
      this.listaGeracao = result;
      if(this.listaGeracao.length){
        let totalEnergia = this.listaGeracao.reduce((soma, item) => (soma + item.kw), 0) / this.unidadesAtivas;
        this.mediaDeEnergia = totalEnergia.toFixed(0);
      }
    })
  }

}
