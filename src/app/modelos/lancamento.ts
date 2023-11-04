import { Conta, MyDate } from "./conta";
import {Timestamp} from 'firebase/firestore';




export interface Lancamento {

  id: string;
  cod: number;
  datadolancamento: Date;
  descricao: string;
  conta_debitada: Conta;
  conta_creditada: Conta;
  valor: number;
  log: MyDate;

}
