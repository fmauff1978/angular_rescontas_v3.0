import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/modelos/conta';
import { LancamentoService } from 'src/app/servicos/lancamento.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  resultados$: Observable<Conta[]>;
  val: any = {};
  sum: number;


  constructor(private fs: AngularFirestore, private ls: LancamentoService){}

    ngOnInit(){
      this.resultados$ =this.fs.collection('contas', (ref) => ref.where('natureza','==',"resultado").where('ativa','==', true).orderBy('cod', 'asc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));


      console.log(this.resultados$)

      this.fs.collection('contas', (ref)=> ref.where('natureza', '==', 'resultado')).valueChanges().subscribe(value => {


        this.val = value;
        console.log(this.val);


        this.sum = this.val.reduce( function( a, b ) {
          return a + b.saldo;
      }, 0 );


      console.log(this.sum)

      this.ls.atualizarresultado(this.sum)

      console.log('resultado acumulado atualizado com sucesso')


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

