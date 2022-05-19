import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IGeracao, IUnidades } from '../models/interface';

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

}
