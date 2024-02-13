import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/modelos/conta';

@Component({
  selector: 'app-passivo',
  templateUrl: './passivo.component.html',
  styleUrls: ['./passivo.component.css']
})
export class PassivoComponent implements OnInit {

  passivos$: Observable<Conta[]>;
  val: any = {};
  sum: number;


  constructor(private fs: AngularFirestore){}

    ngOnInit(){
      this.passivos$ =this.fs.collection('contas', (ref) => ref.where('natureza','==',"passivo").where('ativa','==', true).orderBy('enquadramento', 'desc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));
      console.log(this.passivos$)

      this.fs.collection('contas', (ref)=> ref.where('natureza', '==', 'passivo')).valueChanges().subscribe(value => {


        this.val = value;
        console.log(this.val);


        this.sum = this.val.reduce( function( a, b ) {
          return a + b.saldo;
      }, 0 );


      console.log(this.sum)


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



