import { Timestamp } from "@firebase/firestore";


export interface cdc {


  datadatransacao: Date;
  cod: string;
  descricao: string;
  contavinculada: {cod: number, nome: string, enquadramento:string};
  origem: string;
  qtdedeparcelas: number;
  dataprimeiraparcela: Date;
  ultimaparcela: Timestamp;
  valorparcela: number;
  sv: boolean;
  valorfinanciamento: number;
  parcelasrestantes: number;
  iof: number;
  tarifas_seguros: number;
  ativa: boolean;
  juros: number;
  log: Timestamp;
  enq: string;
  sdo_dev_atual: number;


}
