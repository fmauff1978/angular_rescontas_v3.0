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


  constructor(private fs: AngularFirestore){}

    ngOnInit(){
      this.ativos$ =this.fs.collection('contas', (ref) => ref.where('natureza','==',"ativo").orderBy('cod', 'asc')).get().pipe(map((result)=> this.convertSnaps<Conta>(result)));

     
      console.log(this.ativos$)



 }


 convertSnaps<T>(results){


  return <T[]> results.docs.map(snap=>{
    return{
      id:snap.id,
      ...<any> snap.data()



 }
  })
 }}



