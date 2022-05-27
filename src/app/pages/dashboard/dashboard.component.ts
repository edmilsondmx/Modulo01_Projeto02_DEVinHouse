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

  listaUnidades:IUnidades[] = [];
  listaGeracao:IGeracao[] = [];

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

  buscarUnidades(){
    this.unidadeService.devolverUnidade()
    .subscribe((result:IUnidades[]) =>{
      this.listaUnidades = result;
      this.totalunidades();
      this.isActive();
      this.mediaEnergia();
    })
  }
  totalunidades(){
    this.totalDeUnidades = this.listaUnidades.length;
  }
  isActive(){
    this.listaUnidades.forEach((item) => {
      if(item.isActive === true){
        this.unidadesAtivas += 1;
      } else{
        this.unidadesInativas += 1;
      }
    })
  }
  mediaEnergia(){
    this.unidadeService.devolverGeracao()
    .subscribe((result:IGeracao[]) =>{
      this.listaGeracao = result;
      let totalEnergia = this.listaGeracao.reduce((soma, item) => (soma + item.kw), 0) / this.unidadesAtivas;
      this.mediaDeEnergia = totalEnergia.toFixed(0);
    })
  }

}
