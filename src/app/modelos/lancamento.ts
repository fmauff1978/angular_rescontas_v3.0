import { Conta } from "./conta";




export interface Lancamento {

  id: string;
  cod: number;
  datadolançamento: Date;
  descricao: string;
  conta: Conta;
  valor: number;
  log: Date;

}
