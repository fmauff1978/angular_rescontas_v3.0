import { Conta, MyDate } from "./conta";
import { Timestamp } from "@firebase/firestore";

export interface Lancamento {


  datadolancamento: Date;
  descricao: string;
  conta_debitada: { contadeb_id: string,
    cod_deb: number;
    contadeb: Conta,
    naturezadeb: string,
    enquadramentodeb: string,
    mod_despesa_deb: string}
    ;
    conta_creditada: { contacred_id: string,
      cod_cred: number;
      contacred: Conta,
      naturezacred: string,
      enquadramentocred: string,
      mod_despesa_cred: string}
      ;

  valor: number;
  log: Timestamp;

}
