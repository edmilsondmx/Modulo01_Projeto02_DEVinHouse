import { HttpClient } from '@angular/common/http';
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

  enderecoURL:string = 'http://localhost:3000';

  unidadeFoiSelecionada:boolean = true;

  listaUnidades:IUnidades[] = []
  geracao:IGeracao[] = []

  novaGeracao:IGeracao = {
    id_unid:0,
    data:"",
    kw: 0,
    id:0,
  }

  constructor(
    private unidadeService:UnidadesService,
    private serviceTitle:Title,
    private http:HttpClient) { }

  ngOnInit(): void {
    this.serviceTitle.setTitle('Solar Energy - Cadastro');
    this.buscarUnidade()
    this.buscarGeradores()
  }
  buscarUnidade(){
    this.unidadeService.devolverUnidade()
    .subscribe((result:IUnidades[]) =>{
     this.listaUnidades = result.filter((item) => item.isActive == true);
    })
  }

  buscarGeradores(){
    this.unidadeService.devolverGeracao()
    .subscribe((result:IGeracao[]) =>{
      this.geracao = result;
    })
  }

  cadastrarLancamento(){
    this.novaGeracao.id = Math.floor(Math.random()*100)
    let jaCadastrada = this.geracao.some((item) => item.data == this.novaGeracao.data && item.id_unid == this.novaGeracao.id_unid);
    if(jaCadastrada){
      this.unidadeService.alertaDataCadastrada()
    } else{
      if(this.novaGeracao.id_unid == 0){
        this.unidadeFoiSelecionada = false;
      } else {
        this.unidadeFoiSelecionada = true;
        this.http.post<IGeracao>(`${this.enderecoURL}/geracao`, this.novaGeracao)
      .subscribe(result => {this.unidadeService.alertaKwIncluido()});
      }
    }
    this.buscarGeradores()
  }

}
