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

  val: Array<object> ;



  constructor(private fs: AngularFirestore){}

    ngOnInit(){
      this.ativos$ =this.fs.collection('contas', (ref) => ref.where('natureza','==',"ativo").orderBy('enquadramento', 'asc').orderBy('cod','asc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));

     this.fs.collection('contas', (ref)=> ref.where('natureza', '==', 'ativo')).valueChanges().subscribe(val => console.log(val))

//    this.val = this.fs.collection('contas', (ref)=> ref.where('natureza', '==', 'ativo')).valueChanges().subscribe()

     //var sum = 0;

      //for(var i =0;i<this.val.length;i++){
        //sum+=this.val[i].saldo;
    //  } return sum

    //  console.log(sum);

//console.log(i);

     }



 convertSnaps<T>(results){


  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()
 }
  })
 }

   //this.fs.collection('contas', (ref)=> ref.where('natureza', '==', 'ativo')).valueChanges().subscribe(val => console.log(val))


   sumQuantity()
   {
       var elements = document.getElementsByClassName('valor');
       var sum = 0;
       let i : number;

       for (i=0;i< elements.length;i++)
       {
           sum += parseFloat(elements[i].innerHTML.replace(/,/,'.').replace('R$',''));
       };


       console.log(sum)
   }









}



