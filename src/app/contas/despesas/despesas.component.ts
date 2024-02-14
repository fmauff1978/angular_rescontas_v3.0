
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/modelos/conta';
import { Lancamento } from 'src/app/modelos/lancamento';
import { AggregateField, Firestore, collection } from 'firebase/firestore';
import { LancamentoService } from 'src/app/servicos/lancamento.service';

@Component({
  selector: 'app-despesas',
  templateUrl: './despesas.component.html',
  styleUrls: ['./despesas.component.css']
})
export class DespesasComponent implements OnInit {

  despesas$: Observable<Conta[]>;
  val: any = {};
  sum: number;


  constructor(private fs: AngularFirestore, private ls: LancamentoService){}

    async ngOnInit(){


      this.despesas$ =this.fs.collection('contas', (ref) => ref.where('natureza','==',"despesa").where('ativa','==', true).orderBy('saldo', 'desc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));

      console.log(this.despesas$)

      this.fs.collection('contas', (ref)=> ref.where('natureza', '==', 'despesa')).valueChanges().subscribe(value => {


        this.val = value;
        console.log(this.val);


        this.sum = this.val.reduce( function( a, b ) {
          return a + b.saldo;
      }, 0 );


      console.log(this.sum)

      this.ls.atualizardespesatotal(this.sum)

      console.log('despesa total atualizada com sucesso')


        })


    }

 convertSnaps<T>(results){


  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()

 }
  })
 }

}
