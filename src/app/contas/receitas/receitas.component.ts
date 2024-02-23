
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/modelos/conta';
import { LancamentoService } from 'src/app/servicos/lancamento.service';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})
export class ReceitasComponent implements OnInit {

  receitas$: Observable<Conta[]>;
  val: any = {};
  sum: number;


  constructor(private fs: AngularFirestore, private ls: LancamentoService){}

    ngOnInit(){
      this.receitas$ =this.fs.collection('contas', (ref) => ref.where('natureza','==',"receita").where('ativa','==', true).orderBy('cod', 'asc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));
      console.log(this.receitas$)

      this.fs.collection('contas', (ref)=> ref.where('natureza', '==', 'receita')).valueChanges().subscribe(value => {


        this.val = value;
        console.log(this.val);


        this.sum = this.val.reduce( function( a, b ) {
          return a + b.saldo;
      }, 0 );


      console.log(this.sum)


      this.ls.atualizarreceitatotal(this.sum)

      console.log('receita atualizada com sucesso')
        })
 }


 convertSnaps<T>(results){


  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()
 }
  })
 }}
