import { Timestamp } from '@firebase/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LancamentoService } from '../servicos/lancamento.service';
import { take } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-cdc',
  templateUrl: './cdc.component.html',
  styleUrls: ['./cdc.component.css']
})
export class CdcComponent implements OnInit {

  val : any={}
  fonte : any={}

  atualizado_em: any;
  qtdeparcelasfaltantes: number;
  saldorestante: number;
  vp: number;

  constructor(private fs: AngularFirestore, private ls: LancamentoService){}

  ngOnInit(){

    this.fs.collection('financiamentos', (ref)=> ref.where('ativa', '==', true)).valueChanges().subscribe(value => {
      this.val = value;

      //let tamanho = this.val.length

     this.atualizado_em= this.val[0].log.toDate();

    //console.log(this.atualizado_em)

    this.refresh()

})


}


refresh(){

  this.fs.collection('financiamentos', (ref)=> ref.where('ativa', '==', true)).valueChanges({idField: 'id'}).subscribe(value =>  {
    this.fonte = value;
    console.log(this.fonte)


  for(let i=0;i<this.fonte.length;i++){

    let id : string =this.fonte[i].id;
  let hoje = Timestamp.now().toDate();
   let one = this.fonte[i].ultimaparcela.toDate();
   let valor = this.fonte[i].valorparcela;
   console.log(id, one, valor)
   const now = moment(hoje); // Data de hoje
   const future = moment(one); // Outra data no futuro
   const duration = moment.duration(future.diff(now));
   const months = duration.asMonths();
   this.qtdeparcelasfaltantes = months ;
  this.saldorestante = this.qtdeparcelasfaltantes * valor


  const taxa = this.fonte[i].juros/100;
  const pmt = valor;
  const n = this.qtdeparcelasfaltantes;


  const vp = pmt / taxa * (1 - Math.pow(1 + taxa, -n));

  console.log(taxa, pmt, n)
console.log(vp)


//this.ls.atualizar_cdc(id, this.qtdeparcelasfaltantes, vp)



  }



})


}

}
