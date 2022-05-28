import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IUnidades } from 'src/app/models/interface';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'pro-cadastro-unid',
  templateUrl: './cadastro-unid.component.html',
  styleUrls: ['./cadastro-unid.component.scss']
})
export class CadastroUnidComponent implements OnInit {

  constructor(
    public unidadeService:UnidadesService,
    private serviceTitle:Title) { }

  ngOnInit(): void {
    this.serviceTitle.setTitle('Solar Energy - Cadastrar');
  }

  //método que chama a função de cadastrar unidade e alerta
  adicionarUnidade(){
    this.unidadeService.cadastrarUnidade();
    this.unidadeService.alertaUnidadeAdicionada();
    this.buscarUnidades()
  }

  //método que atualiza a lista de unidades
  buscarUnidades(){
    this.unidadeService.devolverUnidade()
    .subscribe((result:IUnidades[]) =>
    result)
  }

}
