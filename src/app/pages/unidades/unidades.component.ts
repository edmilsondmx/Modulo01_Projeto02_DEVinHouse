import { HttpClient } from '@angular/common/http';
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

  unidades:IUnidades[] = []

  constructor(
    private router:Router,
    private unidadeService:UnidadesService,
    private http : HttpClient,
    private serviceTitle: Title) { }

  ngOnInit(): void {
    this.serviceTitle.setTitle('Solar Energy - Unidades');
    this.buscarUnidade()
  }

  buscarUnidade(){
    this.unidadeService.devolverUnidade()
    .subscribe((result:IUnidades[]) =>{
      this.unidades = result;
    })
  }

  editar(id:number){
    this.unidadeService.cadastro = false;
    this.unidadeService.editarUnidade(id)
    this.router.navigate(['unidades/cadastro-unidades']);
  }

  remover(id:number){
    this.unidadeService.alertaUnidadeRemovida()
    this.unidadeService.removerUnidade(id);
    this.buscarUnidade();
  }


  cadastroUnidades(){
    this.unidadeService.cadastro = true;
    this.router.navigate(['unidades/cadastro-unidades']);
  }

}
