import { LancamentoService } from './../../servicos/lancamento.service';

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Lancamento } from 'src/app/modelos/lancamento';




@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css'],

})
export class LancamentosComponent implements OnInit {


  lancamento$: Observable<Lancamento[]>





  constructor(private ls: LancamentoService, private fs: AngularFirestore){}

    ngOnInit(){

      this.lancamento$ =this.fs.collection('lancamentos', (ref) => ref.orderBy('datadolancamento', 'asc')).get().pipe(map((result)=> this.convertSnaps<Lancamento>(result)));

    console.log(this.lancamento$)

  }

  convertSnaps<T>(results){


    return <T[]> results.docs.map(snap=>{
      return{
        id:snap.id,
        ...<any> snap.data()



   }
    })
   }}
