import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IGeracao, IUnidades } from 'src/app/models/interface';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'pro-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  
  unidadeFoiSelecionada:boolean = true;

  listaUnidades:IUnidades[] = []
  listaGeracao:IGeracao[] = []

  novaGeracao:IGeracao = {
    id_unid:0,
    data:"",
    kw: 0,
    id:0,
  }

  constructor(
    private unidadeService:UnidadesService,
    private serviceTitle:Title
  ) { }

  ngOnInit(): void {
    this.serviceTitle.setTitle('Solar Energy - Cadastro');
    this.buscarUnidadesAtivas();
    this.buscarGeracao();
  }
  
  buscarUnidadesAtivas(){
    this.unidadeService.devolverUnidade()
    .subscribe((result:IUnidades[]) =>{
     this.listaUnidades = result.filter((item) => item.isActive == true);
    })
  }

  buscarGeracao(){
    this.unidadeService.devolverGeracao()
    .subscribe((result:IGeracao[]) =>{
      this.listaGeracao = result;
    })
  }

  cadastrarLancamento(){
    this.buscarGeracao();
    this.novaGeracao.id = Math.floor(Math.random()*100)
    let dataJaCadastrada:boolean = this.listaGeracao.some((item) => item.data == this.novaGeracao.data && item.id_unid == this.novaGeracao.id_unid);
    if(dataJaCadastrada){
      this.unidadeService.alertaDataCadastrada();
    } else{
      if(this.novaGeracao.id_unid == 0){
        this.unidadeFoiSelecionada = false;
      } else {
        this.unidadeFoiSelecionada = true;
        this.unidadeService.cadastrarGeracao(this.novaGeracao);
      }
      this.buscarGeracao();
    }
  }

}
