import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IGeracao, IUnidades } from '../models/interface';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  //variavel que guarda a lista de unidades do json-server
  listaUnidades:IUnidades[] = []

  //variavel que guarda o endereço URl da api / json-server
  enderecoURL:string = 'http://localhost:3000';

  //objeto com as informações da unidade a ser incluida
  novaUnidade:IUnidades = {
    apelido: "",
    local: "",
    marca: "",
    modelo: "",
    isActive: false,
    id: 0,
  }

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  //método que devolve as unidades do json-server
  devolverUnidade():Observable<IUnidades[]>{
    return this.http.get<IUnidades[]>(`${this.enderecoURL}/unidades`)
  }
  //método que devolve as gerações do json-server
  devolverGeracao():Observable<IGeracao[]>{
    return this.http.get<IGeracao[]>(`${this.enderecoURL}/geracao`)
  }

  //método que cadastra nova unidade no json-server
  cadastrarUnidade(){
    this.novaUnidade.id = Math.floor(Math.random()* 1000)
    this.http.post<IUnidades>(`${this.enderecoURL}/unidades`, this.novaUnidade)
    .subscribe(result => {result});
    this.router.navigate(['/unidades'])
  }

  //metodo que pucha unidade a ser editada
  editarUnidade(id:number){
    this.devolverUnidade()
    .subscribe((result:IUnidades[]) =>{
      this.listaUnidades = result;
      let unidade = this.listaUnidades.filter((item) => item.id == id)
      this.novaUnidade = unidade[0]
    })
  }
  
  //método que salva unidade editada no json-server
  salvarEdicao(id:number){
    this.http.put<IUnidades>(`${this.enderecoURL}/unidades/${id}`, this.novaUnidade)
    .subscribe();
    this.router.navigate(['/unidades'])
  }
  
  //método que remove unidade do json-server
  removerUnidade(id:number){
    this.http.delete<IUnidades>(`${this.enderecoURL}/unidades/${id}`)
    .subscribe()
  }
  
  //método que cadastra nova geração de kw no json-server
  cadastrarGeracao(novaGeracao: IGeracao){
    this.http.post<IGeracao>(`${this.enderecoURL}/geracao`, novaGeracao)
      .subscribe(result => {this.alertaKwIncluido()});
  }


  
  //alerta de unidade removida no json-server
  alertaUnidadeRemovida(){
    Swal.fire({
      position: 'top',
      text: '❌ Unidade Removida!',
      width: 350,
      color: '#D82D56',
      background: '#f7d2db',
      showConfirmButton: false,
      timer: 700
    })
  }
  //alerta de unidade adicionada no json-server
  alertaUnidadeAdicionada(){
    Swal.fire({
      position: 'top',
      text: '✔️ Unidade adicionada com Sucesso!',
      width: 400,
      color: '#8DB51B',
      background: '#edf7d3',
      showConfirmButton: false,
      timer: 800
    })
  }
  //alerta de unidade editada no json-server
  alertaEdicaoSalva(){
    Swal.fire({
      position: 'top',
      text: '✔️ Alteração salva com sucesso!',
      width: 400,
      color: '#8DB51B',
      background: '#edf7d3',
      showConfirmButton: false,
      timer: 800
    })
  }
  //alerta data de geração ja feita no json-server
  alertaDataCadastrada(){
    Swal.fire({
      position: 'top',
      text: '❌ ERRO: Data já cadastrada no sistema',
      width: 350,
      color: '#D82D56',
      background: '#f7d2db',
      showConfirmButton: false,
      timer: 1000
    })
  }
  //alerta de kw incluido no json-server
  alertaKwIncluido(){
    Swal.fire({
      position: 'top',
      text: '✔️ Geração incluída com sucesso!',
      width: 400,
      color: '#8DB51B',
      background: '#edf7d3',
      showConfirmButton: false,
      timer: 800
    })
  }

}
