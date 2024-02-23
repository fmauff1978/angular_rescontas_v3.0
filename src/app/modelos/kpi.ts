import { Timestamp } from "@firebase/firestore";


export interface kpi {

  id: string;
  cod:number;
  nome: string;
  orcado: number;
  realizado: number;
  ativa: boolean;

  log: Timestamp;


}
