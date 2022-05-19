import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUnidades } from 'src/app/models/interface';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'pro-cadastro-unid',
  templateUrl: './cadastro-unid.component.html',
  styleUrls: ['./cadastro-unid.component.scss']
})
export class CadastroUnidComponent implements OnInit {

  enderecoURL:string = 'http://localhost:3000';


  constructor(
    private http : HttpClient,
    private router:Router,
    public unidadeService:UnidadesService) { }

  ngOnInit(): void {
  }

  adicionarUnidade(){
    this.unidadeService.cadastrarUnidade()
  }

  salvarAlteracao(id:number){
    this.unidadeService.salvarEdicao(id)
  }

}
