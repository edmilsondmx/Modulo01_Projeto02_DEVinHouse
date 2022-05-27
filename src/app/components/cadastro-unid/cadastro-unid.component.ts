import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'pro-cadastro-unid',
  templateUrl: './cadastro-unid.component.html',
  styleUrls: ['./cadastro-unid.component.scss']
})
export class CadastroUnidComponent implements OnInit {

  constructor(
    private router:Router,
    public unidadeService:UnidadesService) { }

  ngOnInit(): void {
  }

  adicionarUnidade(){
    this.unidadeService.cadastrarUnidade()
    this.unidadeService.alertaUnidadeAdicionada()
  }

  salvarAlteracao(id:number){
    this.unidadeService.salvarEdicao(id)
    this.unidadeService.alertaEdicaoSalva()
    this.router.navigate(['/unidades'])
  }

}
