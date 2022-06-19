import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { IGeracao, IUnidades } from 'src/app/models/interface';
import { AlertasService } from 'src/app/services/alertas.service';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'pro-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  
  //variavel que avisa se alguma unidade foi selecionada ou não
  unidadeFoiSelecionada:boolean = true;

  //lista de unidades ativas e gerações consumidas do json-server
  listaUnidadesAtivas:IUnidades[] = []
  listaGeracao:IGeracao[] = []

  //objeto que guarda as informações da geração que estiver sendo feita
  novaGeracao:IGeracao = {
    id_unid:0,
    data:"",
    kw: 0,
    id:0,
  }

  constructor(
    private unidadeService:UnidadesService,
    private alertasService:AlertasService,
    private serviceTitle:Title
  ) { }

  ngOnInit(): void {
    this.serviceTitle.setTitle('Solar Energy - Lançamento');
    this.buscarUnidadesAtivas();
    this.buscarGeracao();
  }
  
  //método que busca as unidades ativas e adicionas na variável
  buscarUnidadesAtivas(){
    this.unidadeService.devolverUnidade()
    .subscribe((result:IUnidades[]) =>{
     this.listaUnidadesAtivas = result.filter((item) => item.isActive == true);
    })
  }

  //metodo que chama a função de buscar as gerações no json-server e adiciona na variavel
  buscarGeracao(){
    this.unidadeService.devolverGeracao()
    .subscribe((result:IGeracao[]) =>{
      this.listaGeracao = result;
    })
  }

  //método que gera id para a nova geração, verifica se a unidade já tem a data cadastrada no json-server e senão, chama a função de cadastrar a nova geração
  cadastrarLancamento(){
    this.buscarGeracao();
    this.novaGeracao.id = Math.floor(Math.random()*100)
    let dataJaCadastrada:boolean = this.listaGeracao.some((item) => item.data == this.novaGeracao.data && item.id_unid == this.novaGeracao.id_unid);
    if(dataJaCadastrada){
      this.alertasService.alertaDataCadastrada();
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
