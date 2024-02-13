import { collection, AggregateField } from 'firebase/firestore';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/modelos/conta';

@Component({
  selector: 'app-ativo',
  templateUrl: './ativo.component.html',
  styleUrls: ['./ativo.component.css']
})
export class AtivoComponent implements OnInit {

  ativos$: Observable<Conta[]>;

  val: any = {};

  sum: number;

  constructor(private fs: AngularFirestore){}

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


   sumQuantity() {

     }

   }

