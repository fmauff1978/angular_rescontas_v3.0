import { Timestamp } from "@firebase/firestore";


export interface cartaoparcelado {


  datadacompra: Date;
  cod: string;
  descricao: string;
  cartaovinculado: {cod: number, nome: string, enquadramento:string}
  origem: string;
  qtdedeparcelas: number;
  dataparcela: Date;
  ultimaparcela: Timestamp;
  valorparcela: number;
  valorcompra: number;
  saldorestante: number;
  parcelasrestantes: number;
  ativa: boolean;
  juros: number;
  log: Timestamp;


}




