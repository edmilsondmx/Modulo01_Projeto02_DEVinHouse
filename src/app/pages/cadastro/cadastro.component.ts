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
      this.unidades = result;
    })
  }

  buscarGeradores(){
    this.unidadeService.devolverGeracao()
    .subscribe((result:IGeracao[]) =>{
      this.geradores = result;
    })
  }

  cadastrarLancamento(){
    let jaCadastrado = this.geradores.some((item) => item.id == this.geracao.id);
    if(jaCadastrado){
      this.http.put<IGeracao>(`${this.enderecoURL}/geracao/${this.geracao.id}`, this.geracao)
      .subscribe(result => {console.log('Geração alterada!')});
    } else{
      this.http.post<IGeracao>(`${this.enderecoURL}/geracao`, this.geracao)
      .subscribe(result => {console.log('Geração incluída com sucesso!')});
    }

  }

}
