import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

  //alerta de unidade removida no json-server
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
  //alerta de unidade adicionada no json-server
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
  //alerta de unidade editada no json-server
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
  //alerta data de geração ja feita no json-server
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
  //alerta de kw incluido no json-server
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
