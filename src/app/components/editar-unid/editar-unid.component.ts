import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'pro-editar-unid',
  templateUrl: './editar-unid.component.html',
  styleUrls: ['./editar-unid.component.scss']
})
export class EditarUnidComponent implements OnInit {

  constructor(
    private router:Router,
    public unidadeService:UnidadesService
  ) { }

  ngOnInit(): void {
  }

  salvarAlteracao(id:number){
    this.unidadeService.salvarEdicao(id)
    this.unidadeService.alertaEdicaoSalva()
    this.router.navigate(['/unidades'])
  }

}
