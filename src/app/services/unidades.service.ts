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

  cadastro:boolean = true;

  unidades:IUnidades[] = []

  enderecoURL:string = 'http://localhost:3000';

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
    private router:Router) { }

  devolverUnidade():Observable<IUnidades[]>{
    return this.http.get<IUnidades[]>(`${this.enderecoURL}/unidades`)
  }
  devolverGeracao():Observable<IGeracao[]>{
    return this.http.get<IGeracao[]>(`${this.enderecoURL}/geracao`)
  }

  cadastrarUnidade(){
    this.novaUnidade.id = Math.floor(Math.random()* 1000)
    this.http.post<IUnidades>(`${this.enderecoURL}/unidades`, this.novaUnidade)
    .subscribe(result => {result});
    this.router.navigate(['/unidades'])
  }

  editarUnidade(id:number){
    this.devolverUnidade()
    .subscribe((result:IUnidades[]) =>{
      this.unidades = result;
      let unidade = this.unidades.filter((item) => item.id == id)
      this.novaUnidade = unidade[0]
    })
  }

  salvarEdicao(id:number){
    this.http.put<IUnidades>(`${this.enderecoURL}/unidades/${id}`, this.novaUnidade)
    .subscribe()
  }

  removerUnidade(id:number){
    this.http.delete<IUnidades>(`${this.enderecoURL}/unidades/${id}`)
    .subscribe()
  }

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
