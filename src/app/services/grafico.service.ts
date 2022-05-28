import { Injectable } from '@angular/core';
import { IGeracao } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class GraficoService {

  //variável que guarda os valores de kw por mês
  valoresKw:number[] = [0,0,0,0,0,0,0,0,0,0,0,0]

  constructor() { }

  //método que gera os valores por mês dos gráficos
  gerarGrafico(geracao:IGeracao[]){
    geracao.forEach((item:IGeracao) => {
      if(item.data == '2022-01'){
        this.valoresKw[0] += item.kw;
      }else if(item.data == '2022-02'){
        this.valoresKw[1] += item.kw;
      }else if(item.data == '2022-03'){
        this.valoresKw[2] += item.kw;
      }else if(item.data == '2022-04'){
        this.valoresKw[3] += item.kw;
      }else if(item.data == '2022-05'){
        this.valoresKw[4] += item.kw;
      }else if(item.data == '2022-06'){
        this.valoresKw[5] += item.kw;
      }else if(item.data == '2022-07'){
        this.valoresKw[6] += item.kw;
      }else if(item.data == '2022-08'){
        this.valoresKw[7] += item.kw;
      }else if(item.data == '2022-09'){
        this.valoresKw[8] += item.kw;
      }else if(item.data == '2022-10'){
        this.valoresKw[9] += item.kw;
      }else if(item.data == '2022-11'){
        this.valoresKw[10] += item.kw;
      }else if(item.data == '2022-12'){
        this.valoresKw[11] += item.kw;
      }
    })
    
    
  }
}
