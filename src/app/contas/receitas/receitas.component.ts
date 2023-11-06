
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Conta } from 'src/app/modelos/conta';

@Component({
  selector: 'app-receitas',
  templateUrl: './receitas.component.html',
  styleUrls: ['./receitas.component.css']
})
export class ReceitasComponent implements OnInit {

  receitas$: Observable<Conta[]>;


  constructor(private fs: AngularFirestore){}

    ngOnInit(){
      this.receitas$ =this.fs.collection('contas', (ref) => ref.where('natureza','==',"receita").where('ativa','==', true).orderBy('cod', 'asc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));

     
      console.log(this.receitas$)



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

}{

}
