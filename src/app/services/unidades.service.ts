import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IGeracao, IUnidades } from '../models/interface';
import { AlertasService } from './alertas.service';

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
    private router:Router,
    private alertasService:AlertasService
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
      .subscribe(result => {this.alertasService.alertaKwIncluido()});
  }


}
