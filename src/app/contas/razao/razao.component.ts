import { Lancamento } from 'src/app/modelos/lancamento';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/modelos/conta';



@Component({
  selector: 'app-razao',
  templateUrl: './razao.component.html',
  styleUrls: ['./razao.component.css']
})
export class RazaoComponent implements OnInit {

  razaodebitada$: Observable<Lancamento[]>;
  conta$: Observable<Conta[]>;
  val: any = {};




  constructor(private fs: AngularFirestore){}

    ngOnInit(){





      this.fs.collection('contas', (ref)=> ref.where('ativa', '==', 'true')).valueChanges().subscribe(value => {


        this.val = value;
        console.log(this.val);})


        






     // this.razaodebitada$ = this.fs.collection('lancamentos', (ref) => ref.where('conta_debitada','==',this.conta$).orderBy('datadolancamento', 'desc')).get().pipe(map((result)=> this.convertSnaps<Lancamento>(result)));


    //  console.log(this.razaodebitada$)



 }


 convertSnaps<T>(results){


  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()



 }
  })
 }}
{

}

