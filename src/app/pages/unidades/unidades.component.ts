import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUnidades } from 'src/app/models/interface';

@Component({
  selector: 'pro-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {

  unidades:IUnidades[] = [
    {
      id : 0,
      apelido : 'Painel 1',
      local : 'Rua 5',
      marca : 'Canadian',
      modelo : '155w'
    },
    {
      id : 0,
      apelido : 'Painel 2',
      local : 'Rua 15',
      marca : 'Risen',
      modelo : '100w'
    },
    {
      id : 0,
      apelido : 'Painel 3',
      local : 'Rio de Janeiro',
      marca : 'Hanwha',
      modelo : '200w'
    },
    {
      id : 0,
      apelido : 'Painel 4',
      local : 'São Paulo',
      marca : 'Hanwha',
      modelo : '100w'
    },
  ]

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.unidades.forEach((item) => item.id = Math.floor(Math.random()* 1000))
  }

  remover(){}

  editar(){}

  cadastroUnidades(){
    this.router.navigate(['unidades/cadastro-unidades']);
  }

}
