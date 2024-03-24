import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LancamentoService } from '../servicos/lancamento.service';
import { Observable, map } from 'rxjs';
import { kpi } from '../modelos/kpi';
import { Timestamp } from 'firebase/firestore';
import * as moment from 'moment';

@Component({
  selector: 'app-dsh',
  templateUrl: './dsh.component.html',
  styleUrls: ['./dsh.component.css']
})
export class DshComponent implements OnInit{


  kpi$: Observable<kpi[]>;

  val: any = {};

  fonte: any ={}

  atg: number;
dias_decorridos: number;
  diasdec: number;

  constructor(private fs: AngularFirestore, private ls: LancamentoService){}

  ngOnInit() {


    this.kpi$ =this.fs.collection('kpi').get().pipe(map((result)=> this.convertSnaps<kpi>(result)));
    console.log(this.kpi$)

    this.fs.collection('kpi').valueChanges().subscribe(value => {


      this.val = value;
      console.log(this.val);
      var orc = this.val.map(function(e) { return e.orcado; } );
      var real = this.val.map(function(e) { return e.realizado; } );
      let atg = real/orc;
      console.log (atg)
      this.atg = atg;
      })





      let start=moment(Date.now());
      let end1 = new Date (2024, 11,31)
      console.log(start, end1)
      let duration = moment.duration(start.diff(end1)).asDays() * (-1);
      let dias_faltantes = Math.trunc(duration) + 1
      let dias_decorridos = 366-dias_faltantes;
      this.diasdec = dias_decorridos;
      console.log(dias_faltantes, dias_decorridos)

      this.fs.collection('contas', (ref)=> ref.where('ativa', '==', true).where('mod_despesa', '!=', 'off').orderBy('saldo', 'desc')).valueChanges({idField: 'id'}).subscribe(value =>  {
        this.fonte = value;
        console.log(this.fonte)})



}

convertSnaps<T>(results){


  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()
 }
  })
 }

gravarkpi(){



}




}
