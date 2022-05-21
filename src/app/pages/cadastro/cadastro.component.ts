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

  unidades:IUnidades[] = []
  geradores:IGeracao[] = []

  geracao:IGeracao = {
    id_unico:0,
    data:"",
    kw:0,
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
     this.unidades = result.filter((item) => item.isActive == true);
    })
  }

  buscarGeradores(){
    this.unidadeService.devolverGeracao()
    .subscribe((result:IGeracao[]) =>{
      this.geradores = result;
    })
  }

  cadastrarLancamento(){
    this.geracao.id = Math.floor(Math.random()*100)
    let jaCadastrada = this.geradores.some((item) => item.data == this.geracao.data && item.id_unico == this.geracao.id_unico);
    if(jaCadastrada){
      alert('ERRO: Data já cadastrada no sistema')
    } else{
      this.http.post<IGeracao>(`${this.enderecoURL}/geracao`, this.geracao)
      .subscribe(result => {alert('Geração incluída com sucesso!')});
    }
    this.buscarGeradores()
  }

}
