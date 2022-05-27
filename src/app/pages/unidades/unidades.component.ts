import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IUnidades } from 'src/app/models/interface';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'pro-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {

  listaUnidades:IUnidades[] = []

  constructor(
    private router:Router,
    private unidadeService:UnidadesService,
    private serviceTitle: Title
  ) { }

  ngOnInit(): void {
    this.serviceTitle.setTitle('Solar Energy - Unidades');
    this.buscarUnidades()
  }

  //método que busca as unidades no jason-sever e adiciona na variavel
  buscarUnidades(){
    this.unidadeService.devolverUnidade()
    .subscribe((result:IUnidades[]) =>{
      this.listaUnidades = result;
    })
  }

  //método que chama a função de editar a unidade e faz a navegação para a pagina
  editarUnid(id:number){
    this.unidadeService.editarUnidade(id)
    this.router.navigate(['unidades/editar-unidades']);
  }

  //método que chama a função de remover a unidade clicada, alerta e atualia a lista
  removerUnid(id:number){
    this.unidadeService.removerUnidade(id);
    this.unidadeService.alertaUnidadeRemovida()
    this.buscarUnidades();
  }

  //método que direciona para a página de cadastro de unidades
  cadastroUnidades(){
    this.router.navigate(['unidades/cadastro-unidades']);
  }
}
