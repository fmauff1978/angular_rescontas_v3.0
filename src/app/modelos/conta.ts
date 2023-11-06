

  export interface Conta {

    id: string;
    cod: number;
    conta: string;
    natureza: Natureza;
    enquadramento: Enqdo;
    mod_despesa: Mod_Despesa;
    ativa: boolean;
    saldo: number;
    log: MyDate;


  }

  enum Natureza{
    Ativo,
    Passivo,
    Despesa,
    Receita,
    Resultado

  }

  enum Enqdo{
   circulante,
   imobilizado,
   investimento,
   realizável,
   alimentação_fora_de_casa,
   educação,
   familiares,
   financeiras,
   fopag,
   imobiliárias,
   lazer,
   ordinárias,
   mobilidade,
   streaming,
   rotativo,
   cdc,
   financiamento,
   receita,
   resultado

  }

  enum Mod_Despesa{
  compromissada,
  gerenciável,
  off

  }
  export class MyDate {
    seconds: number;
  }

