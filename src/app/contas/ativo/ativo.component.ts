import { collection, AggregateField } from 'firebase/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/modelos/conta';
import { LancamentoService } from 'src/app/servicos/lancamento.service';

@Component({
  selector: 'app-ativo',
  templateUrl: './ativo.component.html',
  styleUrls: ['./ativo.component.css']
})
export class AtivoComponent implements OnInit {

  ativos$: Observable<Conta[]>;
  val: any = {};
  sum: number;
  valor: number;

  constructor(private fs: AngularFirestore, private ls: LancamentoService){}

    ngOnInit(){
      this.ativos$ =this.fs.collection('contas', (ref) => ref.where('natureza','==',"ativo").orderBy('enquadramento', 'asc').orderBy('cod','asc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));
      console.log(this.ativos$);

      this.fs.collection('contas', (ref)=> ref.where('natureza', '==', 'ativo')).valueChanges().subscribe(value => {


        this.val = value;
        console.log(this.val);


        this.sum = this.val.reduce( function( a, b ) {
          return a + b.saldo;
      }, 0 );


      console.log(this.sum)

      this.ls.atualizarativo(this.sum)

      console.log('ativo atualizado com sucesso')


        })}

 convertSnaps<T>(results){


  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()
 }
  })
 }

   //this.fs.collection('contas', (ref)=> ref.where('natureza', '==', 'ativo')).valueChanges().subscribe(val => console.log(val))


}

